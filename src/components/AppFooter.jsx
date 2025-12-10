import React from "react";
import { Layout, Typography, Row, Col } from "antd";
import { FacebookOutlined, TwitterOutlined, InstagramOutlined } from "@ant-design/icons";

const { Footer } = Layout;
const { Title, Paragraph } = Typography;

const AppFooter = () => {
  return (
    <Footer style={{ background: "black", color: "white", textAlign: "center", padding: "50px 0", width: "100vw", minHeight: "250px" }}>
      <Row justify="center" gutter={[32, 32]} style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Col xs={24} sm={12} md={8}>
          <Title level={3} style={{ color: "white", marginBottom: "10px" }}>About Us</Title>
          <Paragraph style={{ color: "#bbbbbb", fontSize: "16px" }}>
            We provide smart home automation solutions with facial recognition technology. Experience the future of home security and control.
          </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={3} style={{ color: "white", marginBottom: "10px" }}>Contact</Title>
          <Paragraph style={{ color: "#bbbbbb", fontSize: "16px" }}>
            Email: support@domo.com <br />
            Phone: +1 234 567 890
          </Paragraph>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Title level={3} style={{ color: "white", marginBottom: "10px" }}>Follow Us</Title>
          <Paragraph style={{ color: "#bbbbbb", fontSize: "16px" }}>
            <a href="#" style={{ color: "white", margin: "0 10px" }}>
              <TwitterOutlined style={{ fontSize: "24px" }} />
            </a>
            <a href="#" style={{ color: "white", margin: "0 10px" }}>
              <FacebookOutlined style={{ fontSize: "24px" }} />
            </a>
            <a href="#" style={{ color: "white", margin: "0 10px" }}>
              <InstagramOutlined style={{ fontSize: "24px" }} />
            </a>
          </Paragraph>
        </Col>
      </Row>
      <Paragraph style={{ color: "#bbbbbb", fontSize: "14px", marginTop: "30px" }}>
        © {new Date().getFullYear()} DOMO. All rights reserved.
      </Paragraph>
    </Footer>
  );
};

export default AppFooter;
