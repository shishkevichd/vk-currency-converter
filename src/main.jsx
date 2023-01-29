// React
import React from "react";
import ReactDOM from "react-dom/client";

// VK
import bridge from "@vkontakte/vk-bridge";
import { ConfigProvider, AdaptivityProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

// Application
import Application from "./index/Application";

// Инициализация приложения
bridge.send("VKWebAppInit");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ConfigProvider>
      <AdaptivityProvider>
        <Application />
      </AdaptivityProvider>
    </ConfigProvider>
  </React.StrictMode>
);
