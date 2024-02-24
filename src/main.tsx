import React from "react";
import ReactDOM from "react-dom/client";
import App from "App.tsx";
import GlobalRenders from "utils/GlobalRenders.tsx";

import "./i18n.ts";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalRenders>
      <App />
    </GlobalRenders>
  </React.StrictMode>,
);
