import React, { useState, useRef, useEffect } from "react";
import { Steps, Form, Input, Button, message, Select, Slider } from "antd";
import { CameraOutlined, CheckCircleOutlined, IdcardOutlined, SettingOutlined } from "@ant-design/icons";
import Webcam from "react-webcam";
import axios from "axios";

const { Step } = Steps;
const { Option } = Select;

const RegistroDomo = () => {
  const [current, setCurrent] = useState(0);
  const [form] = Form.useForm();
  const webcamRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [images, setImages] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [deviceSettings, setDeviceSettings] = useState({});


  useEffect(() => {

    axios.get("http://localhost:5000/devices")
      .then(response => {
        setDevices(response.data);
      })
      .catch(error => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  const handleDeviceChange = (selected) => {
    setSelectedDevices(selected);
    const newSettings = {};
    selected.forEach(deviceId => {
      newSettings[deviceId] = 50;
    });
    setDeviceSettings(newSettings);
  };

  const handleSettingChange = (deviceId, value) => {
    setDeviceSettings(prev => ({ ...prev, [deviceId]: value }));
  };

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  const captureImages = () => {
    setCapturing(true);
    let capturedImages = [];
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 300) { // Reducimos el número de capturas a 10 para pruebas
        clearInterval(interval);
        setCapturing(false);
        message.success("Captura de imágenes completada");
        uploadImages(capturedImages);
        return;
      }
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        capturedImages.push(imageSrc);
        setImages([...capturedImages]);
      }
      count++;
    }, 10); 
  };

  const uploadImages = async (capturedImages) => {
    try {
      const username = form.getFieldValue("usuario");
  
      const payload = {
        username,
        images: capturedImages.map((image, index) => ({
          image_base64: image.split(",")[1],
          file_name: `captura_${index}.jpg`,
        })),
      };
  
      const response = await axios.post("http://localhost:8000/api/faces/save_faces", payload);
      
      console.log("Imágenes enviadas:", response);
      message.success("Imágenes enviadas con éxito");
    } catch (error) {
      console.error("Error enviando imágenes:", error);
      message.error("Error al enviar imágenes");
    }
  };
  

  const handleFinish = (values) => {
    console.log("Datos del registro:", values, "Dispositivos Configurados:", deviceSettings);
    message.success("Registro completado con éxito");
  };

  return (
    <div style={{ width: "50%", margin: "auto", marginTop: "50px" }}>
      <Steps current={current}>
        <Step title="Datos Personales" icon={<IdcardOutlined />} />
        <Step title="Licencia" icon={<CheckCircleOutlined />} />
        <Step title="Dispositivos" icon={<SettingOutlined />} />
        <Step title="Registro Facial" icon={<CameraOutlined />} />
      </Steps>
      
      <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginTop: 20 }}>
        {current === 0 && (
          <>
            <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: "Ingrese su nombre" }]}> 
              <Input /> 
            </Form.Item>
            <Form.Item name="apellido" label="Apellido" rules={[{ required: true, message: "Ingrese su apellido" }]}> 
              <Input /> 
            </Form.Item>
            <Form.Item name="usuario" label="Usuario" rules={[{ required: true, message: "Ingrese un usuario" }]}> 
              <Input /> 
            </Form.Item>
            <Form.Item name="contraseña" label="Contraseña" rules={[{ required: true, message: "Ingrese una contraseña" }]}> 
              <Input.Password /> 
            </Form.Item>
          </>
        )}
        
        {current === 3 && (
          <>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={350} height={250} />
            <Button type="primary" onClick={captureImages} disabled={capturing} style={{ marginTop: 10 }}>
              {capturing ? "Capturando..." : "Iniciar Captura"}
            </Button>
          </>
        )}
        
        <div style={{ marginTop: 20 }}>
          {current > 0 && (
            <Button onClick={prev} style={{ marginRight: 8 }}>
              Anterior
            </Button>
          )}
          {current < 3 && (
            <Button type="primary" onClick={next} disabled={current === 2 && selectedDevices.length > 3}>
              Siguiente
            </Button>
          )}
          {current === 3 && (
            <Button type="primary" htmlType="submit" disabled={capturing}>
              Finalizar Registro
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default RegistroDomo;
