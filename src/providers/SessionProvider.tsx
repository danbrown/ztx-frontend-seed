import { useEffect, useState } from "react";
import LoadingScreen from "@components/LoadingScreen";
import { useZustandStore, zustandStore } from "@zustand/ZustandStoreProvider";
import { useWindow } from "@hooks/useWindow";
import { useSyncLanguage } from "ni18n";

// This provider will protect the pages from showing content before the zustand store is loaded
// This is useful for pages that need to access the zustand store content, like session, account, etc.
export const SessionProvider = ({ children }) => {
  const window = useWindow();

  const [isLoading, setIsLoading] = useState(true);
  const { dispatchSessionInit, dispatchLogout } = useZustandStore("auth");
  const { currentLanguage } = useZustandStore("settings");

  // @ Session & Loading
  useEffect(() => {
    if (window !== null) {
      zustandStore.setState({ loading: true }); // window is set, so we can start loading

      dispatchSessionInit()
        .then(() => {
          zustandStore.setState({ loading: false }); // for loading state
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          dispatchLogout().then(() => {
            zustandStore.setState({ loading: false }); // for loading state
          });
          setIsLoading(false);
        });
    }
  }, [window]);

  // @ Translations
  useSyncLanguage(currentLanguage);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return children;
  }
};
