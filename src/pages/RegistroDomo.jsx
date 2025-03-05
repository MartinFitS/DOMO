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
    axios.get("http://localhost:8000/api/devices/get_catalogue/devices")
      .then(response => {
        setDevices(response.data.devices);  // Guardamos los dispositivos en el estado
      })
      .catch(error => {
        console.error("Error fetching devices:", error);
      });
  }, []);

  const trainModel = async() =>{
    try{
      const response = await axios.get("http://localhost:8000/api/faces/entrenar");

      if(response.status === 200){
        console.log("Modelo entrenado")
      }
    }catch(e){
      console.error(e)
    }
  }

  const handleDeviceChange = (selected) => {
    setSelectedDevices(selected);
    const newSettings = {};
    selected.forEach(deviceId => {
      const device = devices.find(d => d.device_id === deviceId);
      newSettings[deviceId] = device.default_preferences;  // Inicializamos con las preferencias por defecto
    });
    setDeviceSettings(newSettings);
  };

  const handleSettingChange = (deviceId, setting, value) => {
    setDeviceSettings(prev => ({
      ...prev,
      [deviceId]: { ...prev[deviceId], [setting]: value }
    }));
  };


  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);
  const handleFinish = async () => {
    const username = form.getFieldValue("usuario");
    const name = form.getFieldValue("nombre");
    const apellido = form.getFieldValue("apellido");
    const contra = form.getFieldValue("contrasena");
    const licencia = form.getFieldValue("licencia");
  
    const usernameObject = {
      username,
      name,
      apellido,
      contrasena: contra,
      licencia,
      deviceSettings,
    };
  
    try {
      // 1. Registrar al usuario
      const response = await axios.post("http://localhost:8000/api/users/create-user", usernameObject);
      console.log("Usuario creado con éxito:", response);
      message.success("Usuario creado");
  

      captureImages(); // Esto empezará a capturar las imágenes después de la creación del usuario
    } catch (e) {
      console.error(e);
      message.error("Error al registrar el usuario");
    }
  };
  
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
    }, 100);
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

      if(response.status ===200){
        trainModel()
      }
  
      console.log("Imágenes enviadas:", response);
      message.success("Imágenes enviadas con éxito");
    } catch (error) {
      console.error("Error enviando imágenes:", error);
      message.error("Error al enviar imágenes");
    }
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
            <Form.Item name="contrasena" label="contrasena" rules={[{ required: true, message: "Ingrese una contraseña" }]}> 
              <Input.Password /> 
            </Form.Item>
          </>
        )}

{current === 1 && (
          <Form.Item name="licencia" label="License Key" rules={[{ required: true, message: "Ingrese la licencia" }]}> 
            <Input.Password /> 
          </Form.Item>
        )}

        {current === 2 && (
          <>
            <Form.Item label="Seleccionar Dispositivos" name="devices">
              <Select
                mode="multiple"
                placeholder="Seleccione los dispositivos"
                onChange={handleDeviceChange}
                value={selectedDevices}
              >
                {devices.map(device => (
                  <Option key={device.device_id} value={device.device_id}>
                    {device.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            
            {selectedDevices.map(deviceId => {
              const device = devices.find(d => d.device_id === deviceId);
              return (
                <div key={deviceId}>
                  <h4>{device.name}</h4>
                  {device.device_type === 0 && (
                    <div>
                      <label>Brillo:</label>
                      <Slider 
                        min={0} 
                        max={100} 
                        value={parseInt(deviceSettings[deviceId]?.brightness || 50)} 
                        onChange={value => handleSettingChange(deviceId, "brightness", value)}
                      />
                    </div>
                  )}
                  {device.device_type === 1 && (
                    <div>
                      <label>Velocidad:</label>
                      <Select 
                        value={deviceSettings[deviceId]?.speed || "medium"} 
                        onChange={value => handleSettingChange(deviceId, "speed", value)}
                      >
                        <Option value="low">Baja</Option>
                        <Option value="medium">Media</Option>
                        <Option value="high">Alta</Option>
                      </Select>
                    </div>
                  )}
                  
                </div>
              );
            })}
          </>
        )}
        
        {current === 3 && (
          <>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={350} height={250} />
   
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
              Captura tu rostro.
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default RegistroDomo;
