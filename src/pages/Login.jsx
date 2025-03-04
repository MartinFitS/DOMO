import React, { useState, useRef } from "react";
import { Form, Input, Button } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'; // Para redirigir a otra página
import "../assets/styles/login.css";

const Login = () => {
  const videoRef = React.createRef(); // Reemplaza useRef con createRef si prefieres un enfoque más clásico, o mantén useRef si es posible en la nueva versión
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga
  const [recognizedPerson, setRecognizedPerson] = useState(null); // Persona reconocida
  const [formData, setFormData] = useState({ email: "", password: "" }); // Estado para almacenar el formulario
  const navigate = useNavigate(); // Hook de React Router para redirigir

  // Iniciar cámara
  const startCamera = () => {
    alert("Encendiendo la cámara...");
    const constraints = {
      video: {
        width: window.innerWidth < 600 ? 300 : 400,
        height: window.innerWidth < 600 ? 200 : 250,
        facingMode: "user", // Usa la cámara frontal en móviles
      },
    };

    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => alert("Error al acceder a la cámara"));
  };

  // Función para reconocer rostro
  const handleRecognize = async () => {
    setLoading(true);
    try {
      // Aquí puedes colocar tu lógica de reconocimiento
      // Suponiendo que tienes una función o API para el reconocimiento de rostro
      const response = await fetch("/recognize-face", {
        method: "POST",
        body: JSON.stringify({/* datos de la cámara o algo que envíes para el reconocimiento */}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.name !== "Unknown") {
        setRecognizedPerson(data.name);
        console.log(`Reconocimiento exitoso: ${data.name}`);
        navigate(`/hello/${data.name}`);
      } else {
        console.log("No se reconoció el rostro");
        alert("No se reconoció el rostro");
      }
    } catch (error) {
      console.error("Error al reconocer:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar el envío del formulario
  const handleUserSubmit = (values) => {
    console.log("Formulario enviado:", values);
    // Aquí puedes manejar el envío del formulario, como la validación o hacer un login
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="text">
          <h2 className="title">DOMO</h2>
          <p className="context">Use your face to access to your account</p>
        </div>

        <div className="camara-container">
          <video
            ref={videoRef}
            autoPlay
            className="video-feed"
            style={{ width: "100%", height: "auto" }}
          />
        </div>

        <div className="button-group">
          <Button icon={<CameraOutlined />} onClick={startCamera}>
            Iniciar Cámara
          </Button>
          <Button
            loading={loading}
            onClick={handleRecognize}
            type="primary"
            block
          >
            Reconocer
          </Button>
        </div>

        <p className="context">Or use your credentials</p>
        <Form layout="vertical" onFinish={handleUserSubmit}>
          <Form.Item label="Correo" name="email" rules={[{ required: true, type: "email", message: "Ingresa un correo válido" }]}>
            <Input onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </Form.Item>

          <Form.Item label="Contraseña" name="password" rules={[{ required: true, message: "Ingresa tu contraseña" }]}>
            <Input.Password onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </Form.Item>
            <div className="register">
            <p>I don't have an <a href="/register">account</a></p>
            </div>
          <Button type="primary" htmlType="submit">Continuar</Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
