import {
  Button,
  CheckBox,
  Flex,
  Grid,
  IconButton,
  Input,
  responsive,
  Spacing,
  Typography,
} from "@wipsie/ui";
import { NextLink } from "@components/NextLink";
import {
  AtSignIcon,
  EyeIcon,
  EyeOffIcon,
  Lock01Icon,
  Mail01Icon,
  User01Icon,
} from "@wipsie/icons";
import { serviceLinks } from "@config/links";
import { socialLoginProviders } from "@config/socialLoginProviders";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useRouter } from "next/router";
import { useState } from "react";

export const RegisterForm = () => {
  const router = useRouter();

  const { authenticated, session, dispatchLogin } = useZustandStore("auth");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);

  const handleRegister = () => {
    dispatchLogin({
      identifier: "danbrown",
      password: "password",
    }).then((response) => {
      console.log(response);

      // if 'to' param exists, redirect to it, otherwise redirect to main page
      router.push(
        (router?.query?.to as string)
          ? (router?.query?.to as string)
          : serviceLinks.main
      );
    });
  };

  // Tab management
  const maxTabs = 2;
  const [currentTab, setCurrentTab] = useState(0);
  const nextTab = () => currentTab < maxTabs && setCurrentTab(currentTab + 1);
  const prevTab = () => currentTab > 0 && setCurrentTab(currentTab - 1);

  const FormTab1 = () => {
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h5" color="subtext" align="left">
            Username
          </Typography>
          <Spacing height={1} />
          <Input
            fullWidth
            startAdornment={<AtSignIcon />}
            placeholder="Be unique"
          />
          <Spacing height={1} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" color="subtext" align="left">
            Password
          </Typography>
          <Spacing height={1} />
          <Input
            fullWidth
            type={isPasswordVisible ? "text" : "password"}
            startAdornment={<Lock01Icon />}
            placeholder="Password"
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
          <Input
            fullWidth
            startAdornment={<Lock01Icon />}
            placeholder="Confirm Password"
            type="password"
          />
          <Spacing height={1} />
        </Grid>

        <Grid item xs={12}>
          <Button fullWidth variant="contained" onClick={nextTab}>
            Next
          </Button>
        </Grid>
      </>
    );
  };

  const FormTab2 = () => {
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h5" color="subtext" align="left">
            Name
          </Typography>
          <Spacing height={1} />
          <Input fullWidth startAdornment={<User01Icon />} placeholder="Name" />
          <Spacing height={1} />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5" color="subtext" align="left">
            Email Address
          </Typography>
          <Spacing height={1} />
          <Input
            fullWidth
            startAdornment={<Mail01Icon />}
            placeholder="Email Address"
          />
          <Spacing height={2} />
        </Grid>

        <Grid item xs={12}>
          <Flex direction="row" justify="start" wrap="nowrap">
            <CheckBox
              tabIndex={4}
              checked={termsAndConditionsChecked}
              onKeyDown={(e: any) => {
                // space or enter
                if (e.key === " " || e.key === "Enter") {
                  setTermsAndConditionsChecked(!termsAndConditionsChecked);
                }
              }}
              onClick={() =>
                setTermsAndConditionsChecked(!termsAndConditionsChecked)
              }
            />
            <Typography
              align="left"
              color="subtext"
              style={{ fontSize: responsive(12, 14) }}
            >
              By creating an account, you agree to our{" "}
              <NextLink href={serviceLinks.terms} target="_blank">
                Terms of Service
              </NextLink>{" "}
              and our{" "}
              <NextLink href={serviceLinks.privacy} target="_blank">
                Privacy Policy
              </NextLink>
              .
            </Typography>
          </Flex>
          <Spacing height={1} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Button fullWidth variant="outlined" onClick={prevTab}>
            Back
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleRegister}
            disabled={!termsAndConditionsChecked}
          >
            Register
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <Flex fullWidth p={2} pt={2}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h3" align="left">
            Create an account
          </Typography>
          <Spacing height={1} />
          <Typography variant="body1" align="left" color="subtext">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex sapiente
            at alias.
          </Typography>
          <Spacing height={2} />
        </Grid>

        {
          {
            0: <FormTab1 />,
            1: <FormTab2 />,
          }[currentTab]
        }

        <Grid item xs={12}>
          <Spacing height={2} />
          <Flex fullWidth align="center" justify="center" direction="column">
            <NextLink href={`${serviceLinks.auth.login}`}>
              Already have an account? Login
            </NextLink>
          </Flex>
        </Grid>
      </Grid>
    </Flex>
  );
};
