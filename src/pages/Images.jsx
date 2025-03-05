import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageViewer = ({ username }) => {
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/faces/get-image/mserna`);
        setBase64Image(response.data.image_base64);
      } catch (error) {
        console.error("Error al obtener la imagen", error);
      }
    };

    fetchImage();
  }, [username]);

  return (
    <div>
      <h3>Imagen de {username}:</h3>
      {base64Image ? (
        <img src={`data:image/jpeg;base64,${base64Image}`} alt="Imagen de usuario" />
      ) : (
        <p>No se pudo cargar la imagen</p>
      )}
    </div>
  );
};

export default ImageViewer;
