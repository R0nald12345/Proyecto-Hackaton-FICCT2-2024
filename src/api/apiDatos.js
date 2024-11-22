// apiDatos.js
import axios from "axios";

export const apiDatosPost = async (longitud, latitud) => {
  try {
    const fullURL = `https://hackatonuagrm-113f661f3afc.herokuapp.com/api/gpt/reportPDF`;

    const datos = JSON.stringify({
      longitud: longitud,
      latitud: latitud,
    });

    const config = {
      method: 'post',
      url: fullURL,
      headers: { 
        'Content-Type': 'application/json'
      },
      data: datos
    };

    const response = await axios(config);
    
    if (!response.data) {
      throw new Error('No hay datos en la respuesta');
    }

    return response.data;

  } catch (error) {
    console.error("Error al enviar Coordenadas:", error.message);
    throw error; // Re-lanzar el error para manejarlo en el componente
  }
};