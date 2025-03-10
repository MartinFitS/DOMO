import React, { useState, useRef, useCallback } from "react";
import { Button, Input, Form, Card, Typography, message, Space, Checkbox } from "antd";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import house_img from "../assets/img/bungalow-house-of-of-provence- (1).png";
import { CameraOutlined, UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;



const Login = () => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const webcamRef = useRef(null);
    const navigate = useNavigate();

    const capture = useCallback(async () => {
        if (webcamRef.current) {
            let imageSrc = webcamRef.current.getScreenshot();
            
            if (imageSrc) {
                const base64Image = imageSrc.replace(/^data:image\/\w+;base64,/, "");
                try {
                    const response = await axios.post("http://localhost:8000/api/faces/login/face", { img: base64Image });
                    const token = response.data.token;
                    if (token) {
                        localStorage.setItem("token", token);
                        message.success("Inicio de sesión exitoso");
                        navigate("/dashboard"); 
                    }
                } catch (error) {
                    message.error("Error en el inicio de sesión");
                }
            }
        }
    }, []);
    
    const onFinish = async (values) => {
        try {
            const response = await axios.post("https://tu-api.com/login", values);
            localStorage.setItem("token", response.data.token);
            message.success("Inicio de sesión exitoso");
            console.log(response.data);
        } catch (error) {
            message.error("Error en el inicio de sesión");
        }
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                <Card style={{ width: 400, textAlign: "left", padding: 20 }}>
                    <Typography.Text style={{ margin: 0, fontFamily: "serif", textAlign: "left", flex: 1, color: "black", fontSize: "30px" }}>DOMO</Typography.Text>
                    <Title level={3} style={{ color: "#1e40af", marginTop: 10 }}>Your face is your key</Title>
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
                                <div style={{ 
                                    width: 250, 
                                    height: 320, 
                                    borderRadius: "50%", 
                                    overflow: "hidden", 
                                    display: "flex", 
                                    justifyContent: "center", 
                                    alignItems: "center", 
                                    border: "2px solid #1e40af" 
                                }}>
                                    <Webcam
                                        audio={false}
                                        ref={webcamRef}
                                        screenshotFormat="image/jpeg"
                                        style={{ width: 250, height: 320, borderRadius: "50%", objectFit: "cover" }}
                                    />
                                </div>
                                <p style={{ marginTop: 14, textAlign: "center", fontSize: "14px", color: "black" }}>Acerca tu cara y asegurate de que este centrada.</p>
                                <Button type="primary" style={{ marginTop: 10 }} onClick={capture}>Login</Button>
                            </div>
                        )}
                    </Space>
                    
                    {!isCameraOpen && (
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
                    )}
                    

                    <Space style={{ width: "100%", marginTop: 40,justifyContent: "center" }}>
                        <a style={{ color: "black" , textDecoration: "underline"}}>Register here</a>

                    </Space>
                </Card>
            </div>
            
            <div style={{ flex: 1, backgroundColor: "#f9fafb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={house_img} alt="Illustration" style={{ width: "60%" }} />
            </div>
        </div>
    );
};

export default Login;
