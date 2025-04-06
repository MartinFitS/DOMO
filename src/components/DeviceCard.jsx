import React, { useState, useEffect } from "react";
import { Card, Switch, Slider, Select, Typography, Button, Space } from "antd";
import { BulbOutlined, SyncOutlined, AppstoreOutlined } from "@ant-design/icons";
import { FaFan } from "react-icons/fa";



const { Title, Text } = Typography;
const { Option } = Select;

const DeviceCard = ({ device, username }) => {
  const isLight = device.type === "light";
  const isFan = device.type === "fan"; 
  const isPersiana = device.type === "persianas";

  const inicialLed =
    isLight && device.settings?.brightness !== undefined
      ? parseInt(device.settings.brightness)
      : 0;

  const inicialFan =
    isFan && device.settings?.speed !== undefined
      ? device.settings.speed
      : "low";

  const inicialPersiana = 
    isPersiana && device.settings?.open !== undefined
        ? device.settings.open
        : 0;

  const [power, setPower] = useState(isLight ? inicialLed > 0 : isFan ? true : false);
  const [brightness, setBrightness] = useState(isLight ? inicialLed : 255);
  const [fanSpeed, setFanSpeed] = useState(inicialFan);
  const [persianaOpen, setPersianaOpen] = useState(inicialPersiana);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isLight && device.settings?.brightness !== undefined) {
      setBrightness(parseInt(device.settings.brightness));
      setPower(device.settings.brightness > 0);
    }

    if (isFan && device.settings?.speed !== undefined) {
      setFanSpeed(device.settings.speed);
      setPower(true); // activar ventilador por defecto
    }

    if (isPersiana && device.settings?.open !== undefined) {
      setPersianaOpen(device.settings.open);
    }
  }, [device]);

  const sendToParticle = async () => {
    try {
      const accessToken = "decd3f3289ef458cbd0371a760b9bd087d676b78";
      const deviceId = "1d0027000e47313037363132";
  
      const value = isLight
        ? brightness
        : isFan
        ? fanSpeed
        : isPersiana
        ? persianaOpen
        : null;
  
      const endpoint = isLight
        ? "setBrightness"
        : isFan
        ? "setFanSpeed"
        : isPersiana
        ? "setBlindPosition"
        : null;
  
      if (!endpoint || value === null) return;
  
      console.log(`[Particle] Enviando a ${endpoint}:`, value);
  
      const response = await fetch(
        `https://api.particle.io/v1/devices/${deviceId}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `access_token=${accessToken}&args=${value}`,
        }
      );
  
      const data = await response.json();
      console.log("Respuesta de Particle:", data);
    } catch (error) {
      console.error("Error enviando datos a Particle:", error);
    }
  };
  

  const sendToParticleOverride = async (value) => {
    try {
      const accessToken = "decd3f3289ef458cbd0371a760b9bd087d676b78";
      const deviceId = "1d0027000e47313037363132";
  
      const endpoint = isLight
        ? "setBrightness"
        : isFan
        ? "setFanSpeed"
        : isPersiana
        ? "setBlindPosition"
        : null;
  
      if (!endpoint || value === null) return;
  
      const response = await fetch(
        `https://api.particle.io/v1/devices/${deviceId}/${endpoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `access_token=${accessToken}&args=${value}`,
        }
      );
  
      const data = await response.json();
      console.log("Apagado enviado a Particle:", data);
    } catch (error) {
      console.error("Error al enviar apagado a Particle:", error);
    }
  };
  
  const handleBrightnessChange = (value) => {
    if (!isLight) return;
    setBrightness(value);
    setPower(value > 0);
    // No enviar a Particle automáticamente
  };

  const handleFanSpeedChange = (value) => {
    if (!isFan) return;
    setFanSpeed(value);
    sendToParticle(value);
  };

  const handlePersianaChange = (value) => {
    if (!isPersiana) return;
    setPersianaOpen(value);
    // No enviar a Particle automáticamente
  };

  const handlePersianaPowerChange = (checked) => {
    const value = checked ? 100 : 0;
    setPersianaOpen(value);
    sendToParticle(value);
  };

  const handleEditDevice = async () => {
    try {
  
      const updatedSettings = isLight
        ? { brightness }
        : isFan
        ? { speed: fanSpeed }
        : isPersiana
        ? { open: persianaOpen }
        : {};

      console.log(device.id, username, updatedSettings);

  
      const response = await fetch(`http://localhost:8000/api/devices/${device.id}/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: device.name + " (Editado)",
          settings: updatedSettings,
        }),
      });
  
      const data = await response.json();
      console.log("Dispositivo editado:", data);
    } catch (error) {
      console.error("Error al editar dispositivo:", error);
    }
  };
  

  const handleToggleTest = () => {
    if (!isTesting) {
      sendToParticle(); // se manda el valor actual del estado
    } else {
      const offValue = isLight ? 0 : isFan ? "off" : isPersiana ? 0 : null;
      if (offValue !== null) {
        sendToParticleOverride(offValue); // usar valor de apagado
      }
    }
    setIsTesting(!isTesting);
  };
  return (
    <Card
      style={{
        width: 250,
        textAlign: "center",
        borderRadius: "15px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease-in-out",
        transform: (power || persianaOpen > 0) ? "scale(1.05)" : "scale(1.0)",
      }}
    >
      {isLight ? (
        <BulbOutlined
          style={{ fontSize: "40px", color: power ? "yellow" : "#ccc"}}
        />
      ) : isFan ? (
        <FaFan style={{ fontSize: "40px", color: power ? "blue" : "#ccc" }} />
      ) : isPersiana ? (
        <AppstoreOutlined
          style={{ fontSize: "40px", color: persianaOpen > 0 ? "green" : "#ccc" }}
        />
      ) : null}

      <Title level={4} style={{paddingBottom: "14%"}}>{device.name}</Title>


      {isLight && (
        <Slider
          disabled={!power}
          min={0}
          max={255}
          value={brightness}
          onChange={handleBrightnessChange}
          tooltipVisible
        />
      )}

      {isFan && (
        <Select
          disabled={!power}
          value={fanSpeed}
          onChange={handleFanSpeedChange}
          style={{ width: "100%", marginTop: "10px" }}
        >
          <Option value="low">Bajo</Option>
          <Option value="medium">Medio</Option>
          <Option value="high">Alto</Option>
          <Option value="off">Apagado</Option>
        </Select>
      )}

      {isPersiana && (
        <>
          <Slider
            disabled={persianaOpen === 0}
            min={0}
            max={100}
            value={persianaOpen}
            onChange={handlePersianaChange}
            tooltipVisible
            style={{ marginBottom: "10px" }}
          />
          <Text>
            {persianaOpen > 0
              ? `Abierta al ${persianaOpen}%`
              : "Cerrada"}
          </Text>
        </>
      )}

      {!isPersiana && (
        <Text>
          {power
            ? isLight
              ? `Brillo: ${brightness}`
              : `Velocidad: ${fanSpeed}`
            : "Apagado"}
        </Text>
      )}

      <Space style={{ marginTop: "15px" }}>
        <Button type="primary" onClick={handleEditDevice}>
          Editar
        </Button>

        <Button
          type={isTesting ? "default" : "dashed"}
          danger={isTesting}
          onClick={handleToggleTest}
        >
          {isTesting ? "Stop" : "Probar"}
        </Button>
      </Space>
    </Card>
  );
};

export default DeviceCard;
