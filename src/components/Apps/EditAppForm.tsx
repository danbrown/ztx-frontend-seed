import {
  Button,
  Flex,
  Grid,
  Input,
  Spacing,
  TextArea,
  useTheme,
} from "@wipsie/ui";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";
import { User01Icon } from "@wipsie/icons";
import { serviceLinks } from "@config/links";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useRouter } from "next/router";
import { SyncOutlined } from "@ant-design/icons";
import { IApp } from "@zustand/slices/apps.slice";
import { generateSlug } from "@utils/generateSlug";

export const EditAppForm = ({ initialData = null }) => {
  const theme = useTheme();
  const router = useRouter();

  const initialValues: IApp = initialData
    ? initialData
    : {
        name: "",
        slug: "",
        avatar: "",
        description: "",
        homepageUrl: "",
      };

  const { authenticated } = useZustandStore("auth");
  const { dispatchAppsCreate, dispatchAppsUpdate } = useZustandStore("apps");

  // fields
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .min(4, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),
    slug: yup
      .string()
      .min(4, "Too Short!")
      .max(50, "Too Long!")
      .required("Slug is required"),
    avatar: yup.string(),
    description: yup.string(),
    homepageUrl: yup.string().url().required("Homepage URL is required"),
  });
  // end fields

  // slug generator
  function handleSlug(
    value: string,
    setFieldValue: FormikProps<any>["setFieldValue"]
  ) {
    setFieldValue("slug", generateSlug(value));
  }

  // Final Handler
  const handleCreateOrEdit = ({
    name,
    slug,
    avatar,
    description,
    homepageUrl,
  }) => {
    // authentication shield
    if (authenticated) {
      const successAction = (slug) => {
        // after created, push to app dashboard
        router.push(`${serviceLinks.dashboard}/${slug}`);
      };

      const errorAction = (error) => {
        // TODO: should be a toast
      };

      // do the action
      if (initialData) {
        dispatchAppsUpdate(initialData.id, {
          name,
          slug,
          avatar,
          description,
          homepageUrl,
        })
          .then((response) => {
            console.log(response);
            successAction(response.slug);
          })
          .catch((error) => {
            console.log(error);
            errorAction(error);
          });
      } else {
        dispatchAppsCreate({
          name,
          slug,
          avatar,
          description,
          homepageUrl,
        })
          .then((response) => {
            console.log(response);
            successAction(response.slug);
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
                // handle slug editing parity to name
                onChange={(e: any) => {
                  e.preventDefault();
                  handleChange(e);
                  handleSlug(e.target.value, setFieldValue);
                }}
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
                placeholder="Slug"
                tabIndex={2}
                name="slug"
                // handle correct slug transformation
                onChange={(e: any) => {
                  e.preventDefault();
                  setFieldValue("slug", generateSlug(e.target.value));
                }}
                onBlur={handleBlur}
                value={values.slug}
                error={errors.slug !== undefined}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <Input
                startAdornment={<User01Icon />}
                placeholder="Homepage URL"
                tabIndex={3}
                name="homepageUrl"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.homepageUrl}
                error={errors.homepageUrl !== undefined}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextArea
                placeholder="Description"
                name="description"
                tabIndex={4}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                error={errors.description !== undefined}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
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
                {initialData ? "Update App" : "Create App"}
              </Button>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Flex>
  );
};
