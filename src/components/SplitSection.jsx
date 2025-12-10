import React from "react";
import { Row, Col, Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

const SplitSection = () => {
  return (
    <div style={{ width: "100vw", padding: "60px 0", background: "white", minHeight: "100vh" }}>
      <Row gutter={[32, 32]} align="middle" justify="center" style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Left Section */}
        <Col xs={24} md={12} style={{ textAlign: "center", background: "#f9f8f6", padding: "50px", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Title level={1} style={{ fontWeight: "bold" }}>La MLS está aquí</Title>
          <Paragraph style={{ fontSize: "18px", color: "#555" }}>
            No te pierdas el arranque de la temporada más grande hasta ahora. <br />
            Comienza el 22 de febrero a la 1:30 p.m. (CDMX)
          </Paragraph>
          <Button type="primary" size="large" style={{ marginTop: "10px" }}>Ver ahora</Button>
        </Col>
        
        {/* Right Section */}
        <Col xs={24} md={12} style={{ textAlign: "center", background: "#f9f8f6", padding: "50px", minHeight: "400px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Title level={1} style={{ fontWeight: "bold" }}>MacBook Air</Title>
          <Paragraph style={{ fontSize: "18px", color: "#555" }}>Superligera. Superchip M3.</Paragraph>
          <div>
            <Button type="primary" size="large" style={{ marginRight: "10px" }}>Más información</Button>
            <Button size="large">Comprar</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SplitSection;
