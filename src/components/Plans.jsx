import React from "react";
import { Card, Typography, Row, Col, Button } from "antd";

const { Title, Paragraph } = Typography;

const plans = [
  {
    title: "Room",
    price: "$700",
    features: [
      "Room controlled with your face",
      "Two persons registered",
      "Support via email or with extra cost",
    ],
    background: "white",
    border: "1px solid black",
    textColor: "black",
  },
  {
    title: "House",
    price: "$4,000",
    features: [
      "Five rooms with control",
      "Unlimited persons registered",
      "Priority support",
    ],
    background: "black",
    border: "none",
    textColor: "white",
  },
];

const Plans = () => {
  return (
    <div style={{ padding: "90px 0", textAlign: "center", background: "white", width: "100vw", minHeight: "100vh" }}>
      <Title level={2} style={{ marginBottom: "20px" }}>Choose Your Plan</Title>
      <Paragraph style={{ maxWidth: "600px", margin: "0 auto 50px", fontSize: "16px", color: "#555" }}>
        Secure and smart home automation with facial recognition. Choose a plan that fits your needs and experience the future of home security and control.
      </Paragraph>
      <Row gutter={[16, 16]} justify="center">
        {plans.map((plan, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              title={<Title level={3} style={{ color: plan.textColor, marginBottom: "10px" }}>{plan.title}</Title>}
              bordered={false}
              style={{
                height: "450px",
                background: plan.background,
                color: plan.textColor,
                textAlign: "center",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                border: plan.border
              }}
            >
              <Title level={2} style={{ marginBottom: "10px", color: plan.textColor }}>{plan.price} <span style={{ fontSize: "16px" }}>/year</span></Title>
              {plan.features.map((feature, i) => (
                <Paragraph key={i} style={{ color: plan.textColor, fontSize: "14px", marginBottom: "8px" }}>{feature}</Paragraph>
              ))}
              <Button type="primary" style={{ marginTop: "20px", background: plan.textColor === "white" ? "black" : "black", borderColor: plan.textColor === "white" ? "white" : "black", color: "white" }}>
                Buy Now
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Plans;
