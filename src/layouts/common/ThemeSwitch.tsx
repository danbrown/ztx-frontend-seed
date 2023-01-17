import { ButtonGroup, useTheme, IconButton } from "@wipsie/ui";
import { Sun, Moon, Star } from "react-feather";

export default function ThemeSwitch(props: any) {
  const theme = useTheme();

  return (
    <ButtonGroup size="mini">
      <IconButton
      // variant={settings.theme === "light" ? "outlined" : "contained"}
      // onClick={() => dispatch(setCurrentTheme("light"))}
      >
        <Sun />
      </IconButton>
      <IconButton
      // variant={settings.theme === "dark" ? "outlined" : "contained"}
      // onClick={() => dispatch(setCurrentTheme("dark"))}
      >
        <Moon />
      </IconButton>
      <IconButton
      // variant={settings.theme === "cosmic" ? "outlined" : "contained"}
      // onClick={() => {
      //   dispatch(setCurrentTheme("cosmic"));
      // }}
      >
        <Star />
      </IconButton>
    </ButtonGroup>
  );
}
