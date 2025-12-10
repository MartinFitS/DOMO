import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "../assets/styles/home.css";
import "../assets/styles/devices.css";
import UserCard from "../components/UserCard";
import Devices from "../components/Devices";
import Configuration from "../components/Configuration"; 
import "../assets/css/Home.css"

const { Content } = Layout;

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [selectedTab, setSelectedTab] = useState("home"); // Controla la vista actual

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");
    if (storedData) {
      setUserData(JSON.parse(storedData)); // Convertir JSON a objeto
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar onMenuClick={setSelectedTab} /> {/* Pasamos la función para cambiar la vista */}

      <Layout style={{ padding: "20px" }}>
        <Header />

        <Content>
          {selectedTab === "home" && <HomeContent userData={userData} />}
          {selectedTab === "devices" && <Devices userData={userData}/>}
          {selectedTab === "configuration" && <Configuration />}
        </Content>
      </Layout>
    </Layout>
  );
};

const HomeContent = ({ userData }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "15px",
      padding: "30px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "1100px",
      margin: "40px auto",
    }}
  >
    <h2 style={{ fontSize: "30px", fontWeight: "bold", textAlign: "center" }}>
      Welcome to <span style={{ color: "#1890ff" }}>DOMO Dashboard</span>
    </h2>
    <p style={{ fontSize: "24px", textAlign: "center", marginTop: "10px" }}>
      Hello, {userData && userData.user ? userData.user.nombre : "Usuario"} 👋
    </p>

    <div style={{ height: "1px", background: "#ddd", margin: "20px 0" }}></div>

    <h3 style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center" }}>Personas de la casa</h3>

    <div style={{ display: "flex", justifyContent: "center" }}>
      {userData && userData.user ? (
        <UserCard
          photo={userData.user.photo || "https://i.pravatar.cc/150"}
          firstName={userData.user.nombre}
          lastName={userData.user.apellido}
          accountType={userData.user.accountType}
        />
      ) : (
        <p style={{ fontSize: "18px", textAlign: "center" }}>No user data available</p>
      )}
    </div>
  </div>
);

export default Home;
