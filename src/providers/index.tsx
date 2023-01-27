import { ThemeProvider } from "./ThemeProvider";
import { LoadingProvider } from "./LoadingProvider";
import { SWRConfig } from "swr";
import axios from "axios";
import SessionProvider from "./SessionProvider";

export const Providers = ({ children }) => {
  return (
    <SWRConfig
      value={{
        dedupingInterval: 5000, // the interval for checking deduping (in ms)
        fetcher: (url) => axios.get(url).then((res) => res.data), // a custom fetcher
      }}
    >
      <ThemeProvider>
        <LoadingProvider>
          <SessionProvider>{children}</SessionProvider>
        </LoadingProvider>
      </ThemeProvider>
    </SWRConfig>
  );
};
