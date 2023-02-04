import { serviceLinks } from "@config/links";
import {
  Home01Icon,
  Key01Icon,
  LayersThree01Icon,
  Monitor01Icon,
  User01Icon,
} from "@wipsie/icons";

export const APP_DASHBOARD_ROUTES = [
  /* 
    @ GENERAL ROUTES
  */
  { type: "TITLE", label: "General" },
  {
    type: "ITEM",
    label: "Home",
    icon: <Home01Icon />,
    link: `${serviceLinks.appDashboard}`,
  },
  {
    type: "ITEM",
    label: "All Apps",
    icon: <LayersThree01Icon />,
    link: `${serviceLinks.accountDashboard}/apps`,
  },
  {
    type: "ITEM",
    label: "Credentials",
    icon: <Key01Icon />,
    link: `${serviceLinks.appDashboard}/credentials`,
  },

  { type: "SPACING", height: 2 },
];
