import React from "react";
import { Layout, Menu, Card, Row, Col, Statistic, List,Typography } from "antd";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { DashboardOutlined, UserOutlined, FileOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

const { Header, Content, Sider } = Layout;

const data = [
  { name: "Jan", current: 10000, previous: 15000 },
  { name: "Feb", current: 15000, previous: 12000 },
  { name: "Mar", current: 20000, previous: 18000 },
  { name: "Apr", current: 25000, previous: 22000 },
  { name: "May", current: 30000, previous: 28000 },
  { name: "Jun", current: 35000, previous: 32000 },
];

const trafficData = [
  { name: "Linux", users: 20000 },
  { name: "Mac", users: 25000 },
  { name: "iOS", users: 22000 },
  { name: "Windows", users: 24000 },
  { name: "Android", users: 10000 },
];

const locationData = [
  { name: "United States", value: 38.6 },
  { name: "Canada", value: 22.5 },
  { name: "Mexico", value: 30.8 },
  { name: "Other", value: 8.1 },
];

const Dashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh", background: "#1a1818", color: "white" }}>
      <Sider style={{ background: "#1a1818" , borderRight: ".1px solid #9e9e9e"}}>
        <div style={{ padding: 12, textAlign: "center",   color: "white" }}>
        <Typography.Text style={{ margin: 0, fontFamily: "serif", textAlign: "left", flex: 1, color: "white", fontSize: "30px" }}>DOMO</Typography.Text>
        </div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" style={{ background: "#1a1818", color: "white" }}>
          <Menu.Item key="1" icon={<DashboardOutlined />} style={{ color: "white" , padding: "20px" }}>Dashboard</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} style={{ color: "white" }}>Users</Menu.Item>
          <Menu.Item key="3" icon={<FileOutlined />} style={{ color: "white" }}>Documents</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{background:"#1a1818"}}>
        <Header style={{ background: "#1a1818", padding: 10, color: "white", borderBottom: ".1px solid #9e9e9e"}}>Dashboard</Header>
      </Layout>
    </Layout>
  );
};

export default Dashboard;