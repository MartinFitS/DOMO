import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider theme="dark" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo" style={{padding:"10px"}}>DOMO</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Devices</Menu.Item>
        <Menu.Item key="3">Configuration</Menu.Item>
      </Menu>
      <div className="sidebar-footer">
      </div>
    </Sider>
  );
};

export default Sidebar;
