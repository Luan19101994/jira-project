import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./components/layout/sideBar";
import "./assets/css/TableRsuit.css";

import { Layout } from "antd";
const { Content } = Layout;

function App(props) {
  const { ...rest } = props;
  return (
    <div {...rest}>
      <Layout className="flex sm:flex-row flex-col sm:gap-0">
        <SideBar />
        <Layout>
          <Content className="bg-white p-8 m-0 h-screen overflow-y-auto">
            <Outlet className="mt-10" />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
