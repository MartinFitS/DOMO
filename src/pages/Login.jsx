import React, { useState, useRef, useCallback } from "react";
import { Button, Input, Form, Card, Typography, message, Space, Checkbox } from "antd";
import Webcam from "react-webcam";
import axios from "axios";
import house_img from "../assets/img/bungalow-house-of-of-provence- (1).png"
import { CameraOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const webcamRef = useRef(null);

    const capture = useCallback(async () => {
        if (webcamRef.current) {
            let imageSrc = webcamRef.current.getScreenshot();
            
            if (imageSrc) {
                const base64Image = imageSrc.replace(/^data:image\/\w+;base64,/, "");
                try {
                    const response = await axios.post("http://localhost:8000/api/faces/login/face", { img: base64Image });
                    message.success("Inicio de sesión exitoso");
                    console.log(response);
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
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sección Izquierda */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                <Card style={{ width: 400, textAlign: "left", padding: 20 }}>
                    <Typography.Text style={{ color: "#3b82f6", fontWeight: "bold", fontSize: "18px" }}>DOMO</Typography.Text>
                    <Title level={3} style={{ color: "#1e40af", marginTop: 10 }}>Artificial Intelligence Driving Results For The Travel Industry</Title>
                    <p>Welcome back! Please login to your account.</p>
                    
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <Button
                            type="primary"
                            icon={<CameraOutlined />}
                            onClick={() => setIsCameraOpen(!isCameraOpen)}
                            block
                        >
                            Login with Face
                        </Button>
                        {isCameraOpen && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 10 }}>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    width={250}
                                />
                                <Button type="primary" style={{ marginTop: 10 }} onClick={capture}>Capture Photo</Button>
                            </div>
                        )}
                    </Space>
                    
                    <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
                        <Form.Item name="username" rules={[{ required: true, message: "Please enter your email" }]}> 
                            <Input prefix={<UserOutlined />} placeholder="Email Address" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: "Please enter your password" }]}> 
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox>Remember Me</Checkbox>
                            <a style={{ float: "right" }}>Forgot Password?</a>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" block>Login</Button>
                    </Form>
                    <p style={{ textAlign: "center", marginTop: 20 }}>Or login with</p>
                    <Space style={{ width: "100%", justifyContent: "center" }}>
                        <a style={{ color: "#3b82f6" }}>Facebook</a>
                        <a style={{ color: "#3b82f6" }}>LinkedIn</a>
                        <a style={{ color: "#3b82f6" }}>Google</a>
                    </Space>
                </Card>
            </div>
            
            {/* Sección Derecha */}
            <div style={{ flex: 1, backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={house_img} alt="Illustration" style={{ width: "60%" }} />
            </div>
        </div>
    );
};

export default Login;
