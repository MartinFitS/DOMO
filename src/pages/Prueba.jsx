import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, message, Card, Image } from 'antd';
import axios from 'axios';


const Prueba = () => {
const [personName, setPersonName] = useState('');
const [capturedImages, setCapturedImages] = useState([]);
const videoRef = useRef(null);
const [instruction, setInstruction] = useState('Prepárate, la captura comenzará en 3 segundos...');
const [showTrainButton, setShowTrainButton] = useState(false);
const [isCapturing, setIsCapturing] = useState(false);
const [recognizedPerson, setRecognizedPerson] = useState(null);
const instructions = [
  'Acerque su rostro a la cámara',
  'Gire su rostro a la izquierda',
  'Gire su rostro a la derecha',
  'Mire hacia arriba',
  'Mire hacia abajo'
];
const [instructionIndex, setInstructionIndex] = useState(0);

const startCamera = () => {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    })
    .catch(() => {
      message.error('No se pudo acceder a la cámara');
    });
};

const stopCamera = () => {
  if (videoRef.current && videoRef.current.srcObject) {
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    videoRef.current.srcObject = null;
  }
};

const captureImage = () => {
  const canvas = document.createElement('canvas');
  const video = videoRef.current;
  if (video) {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    canvas.toBlob(blob => {
      const file = new File([blob], `captured_${capturedImages.length}.jpg`, { type: 'image/jpeg' });
      setCapturedImages(prev => {
        const newImages = [...prev, file];
        if (newImages.length >= 300) {
          setIsCapturing(false);
          stopCamera();
          setInstruction('Captura completa, presione "Registrar"');
        }
        return newImages;
      });
      if (instructionIndex < instructions.length - 1) {
        setInstructionIndex(prev => prev + 1);
        setInstruction(instructions[instructionIndex + 1]);
      }
    }, 'image/jpeg');
  }
};

useEffect(() => {
  if (isCapturing && capturedImages.length < 300) {
    const captureInterval = setInterval(() => {
      captureImage();
    }, 50);
    return () => clearInterval(captureInterval);
  }
}, [isCapturing, capturedImages.length]);

useEffect(() => {
  console.log("Estado actualizado: showTrainButton =", showTrainButton);
}, [showTrainButton]);

const startAutoCapture = () => {
  setCapturedImages([]);
  setInstructionIndex(0);
  setInstruction('Prepárate, la captura comenzará en 3 segundos...');
  startCamera();
  setTimeout(() => {
    setInstruction(instructions[0]);
    setIsCapturing(true);
  }, 3000);
};

const username = "mserna"

const handleUpload = async () => {
  if (!personName || capturedImages.length < 300) {
    message.error('Por favor, completa todas las capturas antes de registrar.');
    return;
  }

  const formData = new FormData();
  formData.append('person_name', personName);
  capturedImages.forEach(file => formData.append('files', file));

  try {
    const response = await axios.post(`http://localhost:8000/register-face`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    
    console.log("Respuesta del servidor:", response);
    if (response.status === 200) {
      message.success(response.data.message);
      stopCamera();
      setCapturedImages([]);
      setPersonName('');
      setInstruction('');
      setShowTrainButton(true);
    }
  } catch (error) {
    console.error("Error en la subida:", error);
    message.error('Error al registrar el rostro');
  }
};

const handleTrainModel = async () => {
  try {
    const response = await axios.post('http://localhost:8000/train-model');
    if (response.status === 200) {
      message.success('Modelo entrenado exitosamente');
      setShowTrainButton(false);
    }
  } catch (error) {
    message.error('Error al entrenar el modelo');
  }
};

const handleRecognize = async () => {
  startCamera();
  setTimeout(() => {
    const canvas = document.createElement('canvas');
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob(async blob => {
        const file = new File([blob], 'recognition.jpg', { type: 'image/jpeg' });
        const formData = new FormData();
        formData.append('file', file);
        try {
          const response = await axios.post('http://localhost:8000/recognize-face', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          message.success(`Persona reconocida: ${response.data.name} (Confianza: ${response.data.confidence}%)`);
          setRecognizedPerson(response.data.name);
        } catch (error) {
          message.error('Error al reconocer el rostro');
        }
      }, 'image/jpeg');
    }
    stopCamera();
  }, 3000);
};

return (
  <div style={{ padding: 20 }}>
    <Card title="Registrar Rostro" style={{ marginBottom: 20 }}>
      {!showTrainButton ? (
        <>
          <Input
            placeholder="Nombre de la persona"
            value={personName}
            onChange={(e) => setPersonName(e.target.value)}
            style={{ marginBottom: 10 }}
          />
          <div>
            <video ref={videoRef} autoPlay width={300} height={200} style={{ marginTop: 10 }}></video>
            <p style={{ marginTop: 10, fontWeight: 'bold' }}>{instruction}</p>
            <Button onClick={startAutoCapture} style={{ marginTop: 10 }}>Iniciar Captura Automática</Button>
          </div>
          <Button type="primary" onClick={handleUpload} style={{ marginTop: 10 }}>Registrar</Button>
        </>
      ) : (
        <Button type="primary" onClick={handleTrainModel} style={{ marginTop: 10 }}>Entrenar</Button>
      )}
    </Card>


    <div style={{ padding: 20 }}>
    <Card title="Registrar Rostro" style={{ marginBottom: 20 }}>
      <Button type="primary" onClick={handleRecognize} style={{ marginBottom: 10 }}>Reconocer</Button>
      {recognizedPerson && (
        <p style={{ marginTop: 10, fontWeight: 'bold' }}>Persona reconocida: {recognizedPerson}</p>
      )}
    </Card>
  </div>
  </div>
);
}

export default Prueba;