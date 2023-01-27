import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingScreen from "../components/LoadingScreen";
import { zustandStore } from "@zustand/ZustandStoreProvider";
import { useWindow } from "@hooks/useWindow";

export const LoadingProvider = ({ children }) => {
  const router = useRouter();
  const window = useWindow();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = (url: string) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  if (loading) {
    return <LoadingScreen />;
  } else {
    return <>{children}</>;
  }
};
