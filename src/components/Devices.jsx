import React, { useState, useEffect } from "react";
import { Typography, Spin, Alert } from "antd";
import DeviceCard from "./DeviceCard";

const { Title } = Typography;

const Devices = ({userData}) => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = userData.user.username


  console.log("dispositivos sin formarto", devices)

  const devices_format = {
    devices
  }

  console.log(devices_format)
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const storedData = sessionStorage.getItem("userData");
        if (!storedData) {
          setError("No se encontró información del usuario.");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(storedData);
        const username = userData?.user?.username;

        console.log("Solicitando dispositivos para:", username);

        if (!username) {
          setError("No se encontró el nombre de usuario.");
          setLoading(false);
          return;
        }

        // Hacer la solicitud POST a la API
        const response = await fetch("http://localhost:8000/api/devices/get_devices", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Error al obtener los dispositivos");
        }

        console.log("Datos recibidos:", data);

        const deviceMap = {
          "0": { name: "Foco LED", type: "light" },
          "1": { name: "Ventilador", type: "fan" },
          "2": { name: "Persianas", type: "persianas" },
        };

        const formattedDevices = Object.entries(data.devices).map(([key, value]) => ({
          id: value.id,
          ...deviceMap[key],
          settings: value,
        }));


        setDevices(formattedDevices);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxWidth: "1100px",
        margin: "40px auto",
        textAlign: "center",
      }}
    >
      <Title level={2} style={{ fontSize: "30px", fontWeight: "bold" }}>
        Dispositivos Inteligentes
      </Title>

      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <Alert message="Error" description={error} type="error" showIcon />
      ) : devices.length === 0 ? (
        <Alert message="No hay dispositivos" type="info" showIcon />
      ) : (
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          {devices.map((device) => (

          <DeviceCard key={device.id} device={device} username={username} />



          ))}

          {
            console.log("dispositivos para mapear: ",devices)
          }
        </div>
      )}
    </div>
  );
};

export default Devices;
