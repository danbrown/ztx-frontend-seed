import { serviceLinks } from "@config/links";
import {
  Home01Icon,
  Key01Icon,
  LayersThree01Icon,
  Monitor01Icon,
  User01Icon,
} from "@wipsie/icons";

export const APP_DASHBOARD_ROUTES = [
  {
    type: "ITEM",
    label: "All Apps",
    icon: <LayersThree01Icon />,
    link: `${serviceLinks.accountDashboard}/apps`,
  },

  /* 
    @ GENERAL ROUTES
  */
  { type: "TITLE", label: "General" },
  {
    type: "ITEM",
    label: "App Details",
    icon: <Home01Icon />,
    link: `${serviceLinks.appDashboard}`,
  },

  {
    type: "ITEM",
    label: "Credentials",
    icon: <Key01Icon />,
    link: `${serviceLinks.appDashboard}/credentials`,
  },

  { type: "SPACING", height: 2 },
];
