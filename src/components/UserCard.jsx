import React from "react";
import { Card, Avatar, Typography, Tag } from "antd";

const { Title, Text } = Typography;

const UserCard = ({ photo, firstName, lastName, accountType }) => {
  return (
    <Card style={{ width: 300, textAlign: "center", borderRadius: "12px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Avatar size={100} src={photo} alt={`${firstName} ${lastName}`} />
      <Title level={4} style={{ marginTop: "10px" }}>
        {firstName} {lastName}
      </Title>
      <Tag color={accountType === "dueño" ? "green" : "blue"}>
        {accountType === "dueño" ? "Dueño" : "Dueño"}
      </Tag>
    </Card>
  );
};

export default UserCard;
