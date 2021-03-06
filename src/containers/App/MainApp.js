import React from "react";
import { Layout } from "antd";

import Sidebar from "../Sidebar/index";
import App from "routes/index";
import { useSelector } from "react-redux";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
} from "../../constants/ThemeSetting";
import { useRouteMatch } from "react-router-dom";

const { Content, Footer } = Layout;

const MainApp = () => {
  const { navStyle } = useSelector(({ settings }) => settings);
  const match = useRouteMatch();

  const getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };
  const getNavStyles = (navStyle) => {
    switch (navStyle) {
      default:
        return null;
    }
  };

  return (
    <Layout className="gx-app-layout">
      <Sidebar />
      <Layout>
        {getNavStyles(navStyle)}
        <Content
          className={`gx-layout-content ${getContainerClass(navStyle)} `}
        >
          <App match={match} />
          {/*         
            <Footer>
              <div className="gx-layout-footer-content">
                {footerText}
              </div>
            </Footer>
            */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainApp;
