import { useTheme, Button } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useState } from "react";

export default function ThemeSwitch(props: any) {
  const theme = useTheme();

  const { currentTheme, setCurrentTheme } = useZustandStore("settings");
  const [isHovering, setIsHovering] = useState(false);

  const themesList = [
    "dark",
    "light",
    "danbrown",
    "neonlights",
    "swamp",
    "discord",
    "spotify",
    "whatsapp",
    "wipsie",
  ];

  return (
    <Button
      shape="square"
      variant="outlined"
      onClick={() => {
        const index = themesList.indexOf(currentTheme);
        const nextIndex = index + 1 >= themesList.length ? 0 : index + 1;
        setCurrentTheme(themesList[nextIndex] as any);
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering ? "Change Theme" : currentTheme}
    </Button>
  );
}
