import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useTranslation } from "react-i18next";

export const useTranslate = () => {
  const { t, i18n } = useTranslation();
  const { setCurrentLanguage } = useZustandStore("settings");

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  return {
    translate: t,
    ...i18n,
    changeLanguage,
  };
};
