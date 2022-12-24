import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/custom.scss";
import 'aos/dist/aos.css';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
} from "react-router-dom";
import Router from "./constants/router";
import { ProjectManagerProvider } from "./context/ProjectManagerContext";
import { TaskProvider } from "./context/TaskContext";
import { UserManagerProvider } from "./context/UserManagerContext";
import { AuthProvider } from "./context/AuthContext";
import { ConfigProvider } from "antd";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <UserManagerProvider>
      <ProjectManagerProvider>
      <TaskProvider>
        <ConfigProvider theme={{ token: { colorPrimary: "#ff950c" }}}>
          <Router />
        </ConfigProvider>
      </TaskProvider>
      </ProjectManagerProvider>
      </UserManagerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
