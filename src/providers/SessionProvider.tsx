import { useEffect, useState } from "react";
import LoadingScreen from "@components/LoadingScreen";
import { zustandStore } from "@zustand/ZustandStoreProvider";
import { useWindow } from "@hooks/useWindow";
import { useSyncLanguage } from "ni18n";

// This provider will protect the pages from showing content before the zustand store is loaded
// This is useful for pages that need to access the zustand store content, like session, account, etc.
export const SessionProvider = ({ children }) => {
  const window = useWindow();

  const [isLoading, setIsLoading] = useState(true);
  const { loading: loadingZustand, currentLanguage } = zustandStore.getState();

  useEffect(() => {
    if (window !== null) {
      zustandStore.setState({ loading: false });
    }
  }, [window]);

  useEffect(() => {
    if (loadingZustand !== null) {
      setIsLoading(loadingZustand);
    }
  }, [loadingZustand]);

  // @ Translations
  useSyncLanguage(currentLanguage);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return children;
  }
};
