import React, { useState, useRef, useCallback } from "react";
import { Button, Input, Form, Card, Typography, message, Space } from "antd";
import Webcam from "react-webcam";
import axios from "axios";
import { CameraOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const webcamRef = useRef(null);

    const capture = useCallback(async () => {
        if (webcamRef.current) {
            let imageSrc = webcamRef.current.getScreenshot();
            
            if (imageSrc) {
                // Remover "data:image/jpeg;base64," del string base64
                const base64Image = imageSrc.replace(/^data:image\/\w+;base64,/, "");

                console.log(base64Image)
    
                try {
                    const response = await axios.post("http://localhost:8000/api/faces/login/face", { img: base64Image });
                    message.success("Inicio de sesión exitoso");
                    console.log(response.data);
                } catch (error) {
                    message.error("Error en el inicio de sesión");
                }
            }
        }
    }, []);
    

    const onFinish = async (values) => {
        try {
            const response = await axios.post("https://tu-api.com/login", values);
            message.success("Inicio de sesión exitoso");
            console.log(response.data);
        } catch (error) {
            message.error("Error en el inicio de sesión");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: 400, textAlign: "center", padding: 20 }}>
                <Title level={2}>Iniciar Sesión</Title>
                <Space direction="vertical" style={{ width: "100%" }}>
                    <Button
                        type="primary"
                        icon={<CameraOutlined />}
                        onClick={() => setIsCameraOpen(!isCameraOpen)}
                        block
                    >
                        Iniciar sesión con rostro
                    </Button>
                    {isCameraOpen && (
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                            <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={250}
                            />
                            <Button type="primary" style={{ marginTop: 10 }} onClick={capture}>Tomar Foto</Button>
                        </div>
                    )}
                </Space>
                <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
                    <Form.Item name="username" rules={[{ required: true, message: "Por favor ingrese su usuario" }]}> 
                        <Input prefix={<UserOutlined />} placeholder="Usuario" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Por favor ingrese su contraseña" }]}> 
                        <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" block>Iniciar Sesión</Button>
                </Form>
            </Card>
        </div>
    );
};

export default Login;