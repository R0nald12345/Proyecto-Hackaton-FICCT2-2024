// GenerarPdf.jsx
import React, { useEffect, useState } from "react";
import { apiDatosPost } from "../../api/apiDatos";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Documento from "./Documento";

const GenerarPdf = () => {
  const [dato, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await apiDatosPost(-63.66953075, -20.29390746);
        setDatos(response);
        console.log(dato);
      } catch (e) {
        console.error("Error al obtener datos:", e);
      } 
    };
    fetchDatos();
  }, []);

  
  const handleClick = (event) => {
    event.preventDefault();
  };

  
  return (
    <div>
      <PDFDownloadLink
        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2"
        document={<Documento
          condicionesActuales={dato.condicionesActuales}
          especiesRecomendadas = {dato.especiesRecomendadas}
          epocasPlantacion = {dato.epocasPlantacion}
          riesgosIdentificados = {dato.riesgosIdentificados}
          recomendacionesManejo = {dato.recomendacionesManejo}
          planMonitoreo = {dato.planMonitoreo}
        />}
        fileName="Informe.pdf"
      >
        {({ loading }) =>
                loading ? (
                  <button onClick={handleClick}>Cargando...</button>
                ) : (
                  <button onClick={handleClick}>Descargar PDF</button>
                )
              }
      </PDFDownloadLink>
    </div>
  );
};

export default GenerarPdf;