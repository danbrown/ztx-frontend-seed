import { LineChartOutlined, MinusOutlined } from "@ant-design/icons";
import { serviceLinks } from "@config/links";
import {
  Bell02Icon,
  ImageIndentLeftIcon,
  LayoutAlt02Icon,
  LinkExternal01Icon,
  Lock01Icon,
  Share07Icon,
  ShoppingCart01Icon,
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
    icon: <LineChartOutlined />,
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
    @ COMMUNITY ROUTES
  */
  // {
  //   type: "TITLE",
  //   label: "Community",
  //   badge: {
  //     label: "WIP",
  //     color: "danger",
  //   },
  // },
  // {
  //   type: "ITEM",
  //   label: "Activity",
  //   icon: <XIcon />,
  //   link: `${serviceLinks.accountDashboard}/wip`,
  // },
  // {
  //   type: "ITEM",
  //   label: "Followers",
  //   icon: <XIcon />,
  //   link: `${serviceLinks.accountDashboard}/wip`,
  // },

  /* 
    @ MANAGEMENT ROUTES
  */
  {
    type: "TITLE",
    label: "Management",
  },
  {
    type: "ITEM",
    label: "My Orders",
    icon: <ShoppingCart01Icon />,
    link: `${serviceLinks.accountDashboard}/orders`,
  },

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
    label: "Password Reset",
    icon: <Lock01Icon />,
    link: `${serviceLinks.accountDashboard}/password`,
  },
  {
    type: "ITEM",
    label: "Notifications",
    icon: <Bell02Icon />,
    link: `${serviceLinks.accountDashboard}/notifications`,
  },
  {
    type: "ITEM",
    label: "Social Links",
    icon: <Share07Icon />,
    link: `${serviceLinks.accountDashboard}/social`,
  },

  { type: "SPACING", height: 2 },
];
