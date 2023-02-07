import { SyncOutlined } from "@ant-design/icons";
import { AtSignIcon, User01Icon } from "@wipsie/icons";
import { Button, Grid, Input, Spacing, TextArea } from "@wipsie/ui";
import { IAccount } from "@zustand/slices/auth.slice";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { Formik, FormikProps } from "formik";
import * as yup from "yup";

export const EditAccountForm = ({ initialData = null }) => {
  const { account, dispatchAccountUpdate } = useZustandStore("auth");

  const initialValues: IAccount = initialData ? initialData : account;

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),

    bio: yup.string(),
    avatar: yup.string(),
    cover: yup.string(),

    profile: yup.object().shape({
      content: yup.object({}),
    }),
  });

  const handleAccountEdit = async (values) => {
    await dispatchAccountUpdate(initialValues?.id, values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleAccountEdit}
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
      }: FormikProps<IAccount>) => (
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
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
          <Grid item xs={12} md={6}>
            <Input
              startAdornment={<AtSignIcon />}
              placeholder="Username"
              name="username"
              disabled
              fullWidth
              value={values.username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextArea
              placeholder="Bio"
              name="profile.bio"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bio}
              error={errors.profile !== undefined}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Spacing height={2} />
            <Button
              tabIndex={3}
              type="submit"
              backgroundColor="primary"
              disabled={isSubmitting || !isValid}
              startIcon={isSubmitting ? <SyncOutlined spin /> : null}
              fullWidth
              onClick={() => handleSubmit()}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};
