import {
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Spacing,
  Typography,
  useTheme,
} from "@wipsie/ui";
import { Formik } from "formik";
import * as yup from "yup";
import { NextLink } from "@components/NextLink";
import { EyeIcon, EyeOffIcon, Lock01Icon, User01Icon } from "@wipsie/icons";
import { serviceLinks } from "@config/links";
import { socialLoginProviders } from "@config/socialLoginProviders";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { featureControl } from "@config/features";
import { SyncOutlined } from "@ant-design/icons";
import { useRecaptcha } from "@components/Recaptcha/RecaptchaProvider";
import { useWindow } from "@hooks/useWindow";

export const LoginForm = () => {
  const theme = useTheme();
  const router = useRouter();
  const window = useWindow();

  const { authenticated, session, dispatchLogin } = useZustandStore("auth");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // refs and auto focus
  const passwordRef = useRef(null);

  // Recaptcha
  const { recaptchaLoading, handleRecaptcha } = useRecaptcha({
    action: "loginForm",
  });

  // fields
  const validationSchema = yup.object().shape({
    identifier: yup.string().required("Username or Email is required"),
    password: yup.string().required("Password is required"),
  });

  const initialValues = {
    identifier: "",
    password: "",
  };
  // end fields

  const handleLogin = async ({ identifier, password }, { setSubmitting }) => {
    const userAgent = window.navigator.userAgent;

    const { valid } = await handleRecaptcha();

    if (!valid) {
      alert("Recaptcha failed"); // TODO: replace with proper error handling

      setSubmitting(false);
      return;
    } else {
      dispatchLogin({ identifier, password, userAgent }).then((response) => {
        console.log(response);

        // if 'to' param exists, redirect to it, otherwise redirect to main page
        router.push(
          (router?.query?.to as string)
            ? (router?.query?.to as string)
            : serviceLinks.main
        );
      });
    }
  };

  return (
    <Flex fullWidth p={2} pt={2}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
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
                placeholder="Username or Email"
                tabIndex={1}
                name="identifier"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.identifier}
                error={errors.identifier !== undefined}
                fullWidth
                inputProps={{
                  autoFocus: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                tabIndex={2}
                inputProps={{
                  ref: passwordRef,
                }}
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                onKeyPress={(event) => {
                  if (!isSubmitting && isValid) {
                    if (event.key == "Enter") {
                      handleSubmit();
                    }
                  }
                }}
                value={values.password}
                error={errors.password !== undefined}
                fullWidth
                endAdornment={
                  <IconButton
                    backgroundColor={theme.palette.text}
                    icon={isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
                    onClick={() => {
                      setIsPasswordVisible(!isPasswordVisible);
                      passwordRef?.current && passwordRef?.current?.focus();
                    }}
                  />
                }
                startAdornment={<Lock01Icon />}
                placeholder="Password"
                wrapperProps={{
                  style: {
                    paddingRight: 2,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                tabIndex={3}
                type="submit"
                backgroundColor="primary"
                disabled={isSubmitting || !isValid || recaptchaLoading}
                startIcon={
                  isSubmitting || recaptchaLoading ? (
                    <SyncOutlined spin />
                  ) : null
                }
                fullWidth
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Spacing height={2} />
              <Flex
                fullWidth
                align="center"
                justify="center"
                direction="column"
              >
                <NextLink href={`${serviceLinks.auth.register}`}>
                  Not a user? Create an account
                </NextLink>
                <Spacing height={1} />
                <NextLink href={`${serviceLinks.auth.forgotPassword}`}>
                  Forgot password?
                </NextLink>
              </Flex>
            </Grid>

            {featureControl.socialLogin && (
              <>
                <Grid item xs={12}>
                  <Spacing height={1} />
                  <Typography variant="body1" color="subtext" align="center">
                    Or
                  </Typography>
                  <Spacing height={1} />
                </Grid>

                <Grid item xs={12}>
                  <Flex
                    fullWidth
                    align="center"
                    justify="center"
                    direction="row"
                  >
                    {socialLoginProviders.map((provider) => (
                      <IconButton
                        variant="contained"
                        backgroundColor={provider?.color}
                        title={`Sign in with ${provider?.name}`}
                        style={{ margin: 4 }}
                        size="medium"
                      >
                        {provider?.icon}
                      </IconButton>
                    ))}
                  </Flex>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Formik>
    </Flex>
  );
};
