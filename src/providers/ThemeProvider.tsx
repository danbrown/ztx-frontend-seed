import dynamic from "next/dynamic";
const TopProgressBar = dynamic(() => import("../components/TopProgressBar"));
import {
  ThemeProvider as WipsieThemeProvider,
  CssBaseline,
  NprogressBaseline,
} from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";

export const ThemeProvider = ({ children }) => {
  const { currentTheme, setCurrentTheme } = useZustandStore("settings");

  return (
    <WipsieThemeProvider theme={currentTheme}>
      {/* <WipsieThemeProvider theme={theme}> */}
      <CssBaseline />
      <NprogressBaseline type="bar" height="3px" />
      <TopProgressBar />
      {children}
    </WipsieThemeProvider>
  );
};
