import {
  Button,
  Flex,
  Grid,
  IconButton,
  Input,
  Spacing,
  Typography,
} from "@wipsie/ui";
import { NextLink } from "@components/NextLink";
import { EyeIcon, EyeOffIcon, Lock01Icon, User01Icon } from "@wipsie/icons";
import { serviceLinks } from "@config/links";
import { socialLoginProviders } from "@config/socialLoginProviders";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useRouter } from "next/router";
import { useState } from "react";
import { featureControl } from "@config/features";

export const LoginForm = () => {
  const router = useRouter();

  const { authenticated, session, dispatchLogin } = useZustandStore("auth");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // fields
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  // end fields

  const handleLogin = () => {
    dispatchLogin({ identifier, password }).then((response) => {
      console.log(response);

      // if 'to' param exists, redirect to it, otherwise redirect to main page
      router.push(
        (router?.query?.to as string)
          ? (router?.query?.to as string)
          : serviceLinks.main
      );
    });
  };

  return (
    <Flex fullWidth p={2} pt={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Input
            fullWidth
            startAdornment={<User01Icon />}
            placeholder="Username or Email"
            value={identifier}
            onChange={(e: any) => setIdentifier(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Input
            fullWidth
            type={isPasswordVisible ? "text" : "password"}
            startAdornment={<Lock01Icon />}
            placeholder="Password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            endAdornment={
              <IconButton
                backgroundColor="neutral"
                shape="round"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
              </IconButton>
            }
            wrapperProps={{
              style: {
                paddingRight: 2,
              },
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={handleLogin}>
            Login
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Spacing height={2} />
          <Flex fullWidth align="center" justify="center" direction="column">
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
              <Flex fullWidth align="center" justify="center" direction="row">
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
    </Flex>
  );
};
