import React, { useState } from "react";
import { Layout, Card, Menu, Switch, Avatar } from "antd";
import { BulbOutlined, AudioOutlined, LaptopOutlined } from "@ant-design/icons";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DeviceControl from "../components/DeviceControl";
import "../assets/styles/home.css";
import "../assets/styles/devices.css";

const { Content } = Layout;

const Home = () => {
  const [selectedDevice, setSelectedDevice] = useState("light");
  const [devicesOn, setDevicesOn] = useState({
    light: false,
    fan: false,
    speaker: false,
  });

  const handleMenuClick = (e) => setSelectedDevice(e.key);

  const toggleDevice = (device) => {
    setDevicesOn((prev) => ({
      ...prev,
      [device]: !prev[device],
    }));
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />

      <Layout style={{ padding: "20px" }}>
        <Header />

        <Content>
          <div className="welcome-container">
            <h2>Welcome home, Ariel</h2>
          </div>

          {/* Sección de dispositivos */}
          <div className="devices-on">
            <h3 className="tittle-on-off">On or Off</h3>
            <div className="light-row">
              {["light", "fan", "speaker"].map((device, index) => (
                <Card key={device} className="light-card">
                  {device === "light" && <BulbOutlined className="card-icon" />}
                  {device === "fan" && <LaptopOutlined className="card-icon" />}
                  {device === "speaker" && <AudioOutlined className="card-icon" />}
                  <Switch checked={devicesOn[device]} onChange={() => toggleDevice(device)} />
                  <p>{device.charAt(0).toUpperCase() + device.slice(1)}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="devices-row">
            {/* Control de dispositivos */}
            <Card title="Device Control" className="device-card">
              <Menu onClick={handleMenuClick} selectedKeys={[selectedDevice]} mode="horizontal">
                <Menu.Item key="light" icon={<BulbOutlined />}>Lights</Menu.Item>
                <Menu.Item key="fan" icon={<LaptopOutlined />}>Fan</Menu.Item>
                <Menu.Item key="speaker" icon={<AudioOutlined />}>Speaker</Menu.Item>
              </Menu>
              <div className="device-section">
                <DeviceControl selectedDevice={selectedDevice} />
              </div>
            </Card>

            {/* Personas en casa */}
            <Card className="in-home-card">
              <h3>In Home</h3>
              {["Martín", "Mamá", "Papá"].map((name, index) => (
                <div key={index} className="user-item">
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" />
                  <p>{name}</p>
                </div>
              ))}
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Home;
