import {
  Button,
  CheckBox,
  Container,
  Flex,
  Grid,
  Input,
  Loading,
  Spacing,
  TextArea,
  useTheme,
} from "@wipsie/ui";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { User01Icon } from "@wipsie/icons";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { SyncOutlined } from "@ant-design/icons";
import { IAppCredential } from "@zustand/slices/apps.slice";
import { serviceLinks } from "@config/links";

export const EditCredentialForm = ({ initialData = null }) => {
  const DEBUG = false;
  const theme = useTheme();
  const router = useRouter();

  const initialValues: IAppCredential = initialData
    ? initialData
    : {
        name: "",
        redirectUri: "",
        scopes: [],
      };

  const { authenticated } = useZustandStore("auth");
  const {
    currentApp,
    dispatchGetAvailableScopes,
    dispatchAppCredentialsCreate,
    dispatchAppCredentialsUpdate,
  } = useZustandStore("apps");

  // fields
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    redirectUri: yup.string().url().required("Redirect URI is required"),
    scopes: yup
      .array()
      .of(yup.string())
      .min(1)
      .required("Select at least one scope"),
  });
  // end fields

  // start scopes
  const [availableScopes, setAvailableScopes] = useState([]);
  const [isLoadingScopes, setIsLoadingScopes] = useState(false);

  useEffect(() => {
    if (currentApp) {
      setIsLoadingScopes(true);
      dispatchGetAvailableScopes().then((response) => {
        setAvailableScopes(response);
        setIsLoadingScopes(false);
      });
    }
  }, [currentApp]);

  // end scopes

  // Final Handler
  const handleCreateOrEdit = ({ name, redirectUri, scopes }) => {
    // authentication shield
    if (authenticated && currentApp) {
      const successAction = () => {
        // TODO: should be a toast
        router.push(`${serviceLinks.dashboard}/${currentApp.slug}/credentials`);
      };

      const errorAction = (error) => {
        // TODO: should be a toast
      };

      // do the action
      if (initialData) {
        dispatchAppCredentialsUpdate(currentApp.id, initialData.id, {
          name,
          redirectUri,
          scopes,
        })
          .then((response) => {
            console.log(response);
            successAction();
          })
          .catch((error) => {
            console.log(error);
            errorAction(error);
          });
      } else {
        dispatchAppCredentialsCreate(currentApp.id, {
          name,
          redirectUri,
          scopes,
        })
          .then((response) => {
            console.log(response);
            successAction();
          })
          .catch((error) => {
            console.log(error);
            errorAction(error);
          });
      }
    }
  };

  return (
    <Flex fullWidth p={2} pt={2}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleCreateOrEdit}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setSubmitting,
          isValid,
          handleBlur,
        }) => (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Input
                startAdornment={<User01Icon />}
                placeholder="Name"
                tabIndex={1}
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name !== undefined}
                fullWidth
                inputProps={{
                  autoFocus: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                startAdornment={<User01Icon />}
                placeholder="Redirect URI"
                tabIndex={2}
                name="redirectUri"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.redirectUri}
                error={errors.redirectUri !== undefined}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Container fullWidth>
                <Grid container spacing={1}>
                  {availableScopes.map((scope, index) => (
                    <Grid item xs={12} sm={6} md={4} key={scope}>
                      <Flex fullWidth direction="column" align="start">
                        <CheckBox
                          label={scope}
                          tabIndex={3 + index}
                          checked={values.scopes.includes(scope)}
                          onClick={() => {
                            if (values.scopes.includes(scope)) {
                              setFieldValue(
                                "scopes",
                                values.scopes.filter((s) => s !== scope)
                              );
                            } else {
                              setFieldValue("scopes", [
                                ...values.scopes,
                                scope,
                              ]);
                            }
                          }}
                        />
                      </Flex>
                    </Grid>
                  ))}

                  {isLoadingScopes && (
                    <Grid item xs={12}>
                      <Flex fullWidth justify="center">
                        <Loading type="dots" />
                      </Flex>
                    </Grid>
                  )}
                </Grid>
              </Container>
            </Grid>
            <Grid item xs={12}>
              {DEBUG && (
                <code>
                  <pre>{JSON.stringify(initialData)}</pre>
                </code>
              )}

              <Spacing height={1} />

              <Button
                tabIndex={3}
                type="submit"
                backgroundColor="primary"
                disabled={isSubmitting || !isValid}
                startIcon={isSubmitting ? <SyncOutlined spin /> : null}
                fullWidth
                onClick={() => handleSubmit()}
              >
                {initialData ? "Update Credential" : "Create Credential"}
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Flex>
  );
};
