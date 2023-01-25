import { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import axios from "axios";
import { useWindow } from "@hooks/useWindow";

export const RecaptchaContext = createContext(null);

export const RecaptchaProvider = ({ enabled, children }) => {
  if (!enabled) {
    return children;
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}
    >
      <script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_KEY}`}
      ></script>
      <RecaptchaSubProvider>{children}</RecaptchaSubProvider>
    </GoogleReCaptchaProvider>
  );
};

const RecaptchaSubProvider = ({ children }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const window = useWindow();
  const [recaptchaLoading, setRecaptchaLoading] = useState(false);

  const handleRecaptcha = async (
    apiRoute: string = null,
    action: string = "actionName",
    callback = null
  ) => {
    let error: any, token: string, valid: boolean;
    setRecaptchaLoading(true);

    if (!executeRecaptcha) {
      error = { error: "Recaptcha not loaded" };
      token = null;
      valid = false;

      setRecaptchaLoading(false);

      return { error, token, valid };
    }

    const result = await executeRecaptcha(action);

    if (result) {
      await axios
        .post(apiRoute || `${window.location.origin}/api/recaptcha-verify`, {
          token: result,
        })
        .then(async () => {
          setRecaptchaLoading(false);

          valid = true;
          token = result;
          error = null;

          callback && callback(result);
        })
        .catch((error) => {
          setRecaptchaLoading(false);

          valid = false;
          token = null;
          error = error;

          callback && callback(error);
        });
    } else {
      setRecaptchaLoading(false);

      valid = false;
      token = null;
      error = { error: "Recaptcha not loaded" };

      callback && callback({ error: "Recaptcha Failed" });
    }

    return { valid, token, error };
  };

  return (
    <RecaptchaContext.Provider
      value={{
        handleRecaptcha,
        recaptchaLoading,
      }}
    >
      {children}
    </RecaptchaContext.Provider>
  );
};

export const useRecaptcha = (
  props: {
    verifyUrl?: string;
    callback?: (data: any) => void;
    action?: string;
  } = {}
) => {
  const { verifyUrl = null, callback = null, action = "actionName" } = props;

  const {
    handleRecaptcha: _handleRecaptcha_api,

    recaptchaLoading,
  } = useContext(RecaptchaContext);

  // check if is under provider
  if (!_handleRecaptcha_api) {
    throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  }

  const handleRecaptcha = async () => {
    const { valid, token, error } = await _handleRecaptcha_api(
      verifyUrl,
      action,
      callback
    );

    return { valid, token, error };
  };

  return {
    handleRecaptcha,
    recaptchaLoading,
  };
};
