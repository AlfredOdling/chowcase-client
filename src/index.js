"use strict";
import React from "react";
import ReactDOM from "react-dom";

import NextApp from "./NextApp";
import registerServiceWorker from "./registerServiceWorker";
import { AppContainer } from "react-hot-loader";

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("root")
  );
};

registerServiceWorker();

render(NextApp);

if (module.hot) {
  module.hot.accept("./NextApp", () => {
    render(NextApp);
  });
}
