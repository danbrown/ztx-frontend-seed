import { useEffect, useState } from "react";
import LoadingScreen from "@components/LoadingScreen";
import { zustandStore } from "@zustand/ZustandStoreProvider";
import { useRouter } from "next/router";
import { serviceLinks } from "@config/links";

// This provider will protect the pages from showing content before the zustand store is loaded
// This is useful for pages that need to access the zustand store content, like session, account, etc.
export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const { authenticated, loading: loadingZustand } = zustandStore.getState();

  useEffect(() => {
    if (!loadingZustand && !authenticated) {
      // TODO: enqueue a toast message to inform the user that he needs to login

      router.push(
        `${serviceLinks.auth.login}?to=${serviceLinks.accountDashboard}`
      );
    } else {
      setIsLoading(false);
    }
  }, [loadingZustand, authenticated]);

  // return <LoadingScreen />;
  if (!authenticated || isLoading) {
  } else {
    return children;
  }
};

export const withAuth = (Component: React.FC<any>, props = {}) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);
    const { authenticated, loading: loadingZustand } = zustandStore.getState();

    useEffect(() => {
      if (!loadingZustand && !authenticated) {
        // TODO: enqueue a toast message to inform the user that he needs to login

        router.push(
          `${serviceLinks.auth.login}?to=${serviceLinks.accountDashboard}`
        );
      } else {
        setIsLoading(false);
      }
    }, [loadingZustand, authenticated]);

    return !isLoading ? <Component {...props} /> : null;
  };

  return AuthenticatedComponent;
};
