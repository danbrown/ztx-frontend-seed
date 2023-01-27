import { useTheme } from "@wipsie/ui";
import { DefaultLayout } from "@layouts/DefaultLayout/DefaultLayout";
import { NextLink } from "@components/NextLink";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useEffect, useState } from "react";
import apiWorker from "@utils/apiWorker";

export default function Home(props) {
  const theme = useTheme();

  const { account, session, loading } = useZustandStore("auth");

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    apiWorker.get("/auth/sessions").then((response) => {
      setSessions(response.data);
    });
  }, []);

  return (
    <DefaultLayout>
      <code>
        <pre>{JSON.stringify({ sessions }, null, 2)}</pre>
      </code>

      <code>
        <pre>{JSON.stringify({ account, session }, null, 2)}</pre>
      </code>
    </DefaultLayout>
  );
}
