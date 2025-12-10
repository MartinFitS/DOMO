import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, AppstoreOutlined, SettingOutlined } from "@ant-design/icons";

const { Sider } = Layout;

const Sidebar = ({ onMenuClick }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider theme="dark" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className="logo" style={{ padding: "10px", color: "#fff", textAlign: "center", fontSize: "18px" }}>
        DOMO
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["home"]} onClick={(e) => onMenuClick(e.key)}>
        <Menu.Item key="home" icon={<HomeOutlined />}>Home</Menu.Item>
        <Menu.Item key="devices" icon={<AppstoreOutlined />}>Devices</Menu.Item>
        <Menu.Item key="configuration" icon={<SettingOutlined />}>Configuration</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
