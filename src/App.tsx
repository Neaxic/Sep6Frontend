import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button, Card, ConfigProvider, theme } from "antd";
import { Router } from "./components/Router";
import { PageProvider, usePageContext } from "./contexts/PageContext";

function App() {
  const { defaultAlgorithm, darkAlgorithm } = theme;
  let { isDarkMode } = usePageContext();

  return (
    <PageProvider>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        <Router></Router>
      </ConfigProvider>
    </PageProvider>
  );
}

export default App;
