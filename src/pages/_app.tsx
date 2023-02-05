import "../styles/global.css";

import { Providers } from "../providers";

import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "../../ni18n.config";

const MyApp: React.FC<any> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

export default appWithI18Next(MyApp, ni18nConfig);
