import { LoadingOutlined } from "@ant-design/icons";
import { NextLink } from "@components/NextLink";
import { SlugNextLink } from "@components/SlugNextLink";
import { serviceLinks } from "@config/links";
import { useCopyToClipboard } from "@hooks/useCopyToClipboard";
import { Copy01Icon, EyeIcon, EyeOffIcon } from "@wipsie/icons";
import {
  Button,
  Container,
  Flex,
  Grid,
  IconButton,
  Input,
  responsive,
  Spacing,
  Typography,
} from "@wipsie/ui";
import { IApp, IAppCredential } from "@zustand/slices/apps.slice";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useState } from "react";

export const CredentialItemCard = ({
  credentialData,
}: {
  credentialData: IAppCredential;
}) => {
  const {
    currentApp,
    dispatchAppCredentialsGetSecret,
    dispatchAppCredentialsDelete,
  } = useZustandStore("apps");

  const [isLoadingSecret, setIsLoadingSecret] = useState(false);
  const [credentialSecret, setCredentialSecret] =
    useState<IAppCredential>(null);
  const [_, copyToClipboard] = useCopyToClipboard();

  const handleGetCredentialSecret = async () => {
    if (currentApp) {
      setIsLoadingSecret(true);
      await dispatchAppCredentialsGetSecret(
        currentApp.id,
        credentialData.id
      ).then((response) => {
        setCredentialSecret(response);
        setIsLoadingSecret(false);
      });
    }
  };

  const [isDeleted, setIsDeleted] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  if (isDeleted) {
    return null;
  }

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="h4">{credentialData.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="subtext"
            style={{
              fontSize: responsive(12, 14),
            }}
          >
            Client Id:
          </Typography>
          <Spacing height={0.5} />
          <Input
            value={credentialData.clientId}
            fullWidth
            endAdornment={
              <IconButton
                size="small"
                shape="rounded"
                title="Copy"
                onClick={() => {
                  copyToClipboard(credentialData.clientId);

                  // TODO: show a toast
                  alert("Copied to clipboard");
                }}
              >
                <Copy01Icon />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="subtext"
            style={{
              fontSize: responsive(12, 14),
            }}
          >
            Client Secret:
          </Typography>
          <Spacing height={0.5} />
          {credentialSecret ? (
            <Input
              value={credentialSecret.clientSecret}
              fullWidth
              endAdornment={
                <Flex direction="row" wrap="nowrap" align="center">
                  <IconButton
                    size="small"
                    shape="rounded"
                    title="Hide"
                    onClick={() => {
                      setCredentialSecret(null);
                    }}
                  >
                    <EyeOffIcon />
                  </IconButton>

                  <IconButton
                    size="small"
                    shape="rounded"
                    title="Copy"
                    onClick={() => {
                      copyToClipboard(credentialSecret.clientSecret);

                      // TODO: show a toast
                      alert("Copied to clipboard");
                    }}
                  >
                    <Copy01Icon />
                  </IconButton>
                </Flex>
              }
            />
          ) : (
            <Input
              value={"**************************************"}
              fullWidth
              disabled
              endAdornment={
                <IconButton
                  size="small"
                  shape="rounded"
                  title="Reveal"
                  disabled={isLoadingSecret || isLoadingDelete}
                  onClick={() => {
                    handleGetCredentialSecret();
                  }}
                >
                  {isLoadingSecret ? <LoadingOutlined spin /> : <EyeIcon />}
                </IconButton>
              }
            />
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            style={{
              fontSize: responsive(12, 14),
            }}
          >
            Scopes:{" "}
            {credentialData.scopes.map((scope, index) => {
              return index === credentialData.scopes.length - 1
                ? scope
                : scope + ", ";
            })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="subtext"
            style={{
              fontSize: responsive(12, 14),
            }}
          >
            Redirect URI:{" "}
            <NextLink href={credentialData.redirectUri} target="_blank">
              {credentialData.redirectUri}
            </NextLink>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body1"
            color="subtext"
            style={{
              fontSize: responsive(12, 14),
            }}
          >
            Created At: {new Date(credentialData.createdAt).toDateString()}
          </Typography>
          <Spacing height={1} />
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            backgroundColor="danger"
            disabled={isLoadingSecret || isLoadingDelete}
            onClick={() => {
              // TODO: show a confirmation dialog
              const isConfirmed = confirm(
                "Are you sure you want to delete this credential?"
              );

              if (isConfirmed) {
                if (currentApp) {
                  setIsLoadingDelete(true);
                  dispatchAppCredentialsDelete(
                    currentApp.id,
                    credentialData.id
                  ).then(() => {
                    setIsDeleted(true);
                    setIsLoadingDelete(false);
                  });
                }
              }
            }}
          >
            {isLoadingDelete ? <LoadingOutlined spin /> : "Delete"}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <SlugNextLink
            href={`${serviceLinks.appDashboard}/credentials/new?id=${credentialData.id}`}
          >
            <Button
              size="small"
              fullWidth
              disabled={isLoadingSecret || isLoadingDelete}
            >
              Edit
            </Button>
          </SlugNextLink>
        </Grid>
      </Grid>
    </Container>
  );
};
