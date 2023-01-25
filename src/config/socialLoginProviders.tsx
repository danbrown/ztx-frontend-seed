import {
  FacebookOutlined,
  GithubOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

export const socialLoginProviders = [
  {
    name: "google",
    icon: <GoogleOutlined />,
    color: "danger",
  },
  {
    name: "facebook",
    icon: <FacebookOutlined />,
    color: "#3B5998",
  },
  {
    name: "github",
    icon: <GithubOutlined />,
    color: "neutral",
  },
  {
    name: "twitter",
    icon: <TwitterOutlined />,
    color: "#1DA1F2",
  },
];
