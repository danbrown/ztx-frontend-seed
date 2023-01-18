import { ButtonGroup, useTheme, IconButton } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { Sun, Moon, Star } from "react-feather";

export default function ThemeSwitch(props: any) {
  const theme = useTheme();

  const { currentTheme, setCurrentTheme } = useZustandStore("settings");

  return (
    <ButtonGroup size="mini">
      <IconButton
        variant={currentTheme === "light" ? "outlined" : "contained"}
        onClick={() => setCurrentTheme("light")}
      >
        <Sun />
      </IconButton>
      <IconButton
        variant={currentTheme === "dark" ? "outlined" : "contained"}
        onClick={() => setCurrentTheme("dark")}
      >
        <Moon />
      </IconButton>
      <IconButton
        variant={currentTheme === "cosmic" ? "outlined" : "contained"}
        onClick={() => setCurrentTheme("cosmic")}
      >
        <Star />
      </IconButton>
    </ButtonGroup>
  );
}
