import React, { useState, useEffect } from "react";
import { Layout, Typography, Menu } from "antd";
import Plans from "../components/Plans";
import laptopImg from "../assets/img/laptop-realista-telefono-inteligente.png";
import AppFooter from "../components/AppFooter";
import SplitSection from "../components/SplitSection";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const Index = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout style={{ background: "#f9f8f6", textAlign: "center", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      {/* Header */}
      <Header style={{
        background: "#f9f8f6",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 50px",
        boxShadow: scrolled ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
        transition: "all 0.3s ease"
      }}>
        <Title level={2} style={{ margin: 0, fontFamily: "serif", textAlign: scrolled ? "left" : "center", flex: 1, color: "black" }}>DOMO</Title>
        {scrolled && (
          <Menu mode="horizontal" style={{ border: "none", background: "#f9f8f6" }}>
            <Menu.Item key="dashboard">Dashboard</Menu.Item>
            <Menu.Item key="about">About Us</Menu.Item>
          </Menu>
        )}
      </Header>
      
      {/* Hero Section */}
      <Content style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "100px", marginBottom: "160px", zIndex: 1 }}>
        <Title level={1} style={{ fontSize: "80px", fontWeight: "bold", fontFamily: "serif", marginBottom: "20px" }}>
            THE CONTROL <br /> IS YOUR FACE
        </Title>
        <div style={{ position: "relative", display: "inline-block" }}>
          <img 
            src={laptopImg}
            alt="Laptop Showcase" 
            style={{ width: "200px", borderRadius: "10px", position: "relative", zIndex: 1 }}
          />
        </div>
        <Paragraph style={{ fontSize: "30px", marginTop: "20px", fontFamily: "serif" }}>
        START WITH THE NEW ERA OF FACIAL TECHNOLOGY
        </Paragraph>
      </Content>

      <Plans/>
      <AppFooter/>
    </Layout>
  );
};

export default Index;
