import { Button, useTheme } from "@wipsie/ui";
import { useZustandStore } from "@zustand/ZustandStoreProvider";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@layouts/DashboardLayout/DashboardLayout";

export default function Home(props) {
  const theme = useTheme();

  const { account, session, dispatchSessionRemoveAll, dispatchSessionGetAll } =
    useZustandStore("auth");

  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    dispatchSessionGetAll().then((response) => {
      setSessions(response);
    });
  }, []);

  return (
    <DashboardLayout
      type="ACCOUNT"
      meta={{
        title: "Dashboard",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <code>
          <pre>{JSON.stringify({ sessions }, null, 2)}</pre>
        </code>

        <code>
          <pre>{JSON.stringify({ account, session }, null, 2)}</pre>
        </code>
      </div>
    </DashboardLayout>
  );
}
