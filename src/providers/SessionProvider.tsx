import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "@components/LoadingScreen";
import { zustandStore } from "@zustand/ZustandStoreProvider";
import { useWindow } from "@hooks/useWindow";
import { serviceLinks } from "@config/links";

// This provider will protect the pages from showing content before the zustand store is loaded
// This is useful for pages that need to access the zustand store content, like session, account, etc.
const SessionProvider = ({ children }) => {
  const window = useWindow();

  const [loading, setLoading] = useState(true);
  const { loading: loadingZustand } = zustandStore.getState();

  useEffect(() => {
    if (window !== null) {
      zustandStore.setState({ loading: false });
    }
  }, [window]);

  useEffect(() => {
    if (loadingZustand !== null) {
      setLoading(loadingZustand);
    }
  }, [loadingZustand]);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return children;
  }
};

export default SessionProvider;
