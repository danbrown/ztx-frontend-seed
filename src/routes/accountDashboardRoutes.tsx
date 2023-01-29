
import { serviceLinks } from "@config/links";
import {
  LayersThree01Icon,
  Monitor01Icon,
  User01Icon,
} from "@wipsie/icons";

export const ACCOUNT_DASHBOARD_ROUTES = [
  /* 
    @ GENERAL ROUTES
  */
  { type: "TITLE", label: "General" },
  {
    type: "ITEM",
    label: "All Apps",
    icon: <LayersThree01Icon />,
    link: `${serviceLinks.accountDashboard}`,
  },

  /* 
    @ CONTENT ROUTES
  */
  {
    type: "TITLE",
    label: "Content",
    badge: {
      label: "New",
      color: "success",
    },
  },
  // {
  //   type: "ITEM",
  //   label: "Media Library",
  //   icon: <Image03Icon />,
  //   link: `${serviceLinks.accountDashboard}/media`,
  // },

  /* 
    @ ACCOUNT ROUTES
  */
  {
    type: "TITLE",
    label: "Account",
  },

  {
    type: "ITEM",
    label: "My Profile",
    icon: <User01Icon />,
    link: `${serviceLinks.accountDashboard}/profile`,
  },
  {
    type: "ITEM",
    label: "Sessions",
    icon: <Monitor01Icon />,
    link: `${serviceLinks.accountDashboard}/sessions`,
  },

  { type: "SPACING", height: 2 },
];
