import { FiAlignJustify } from "react-icons/fi";
import React, { useEffect, useState } from "react";
// import { useMapBox } from "../hooks/useMapBox";
import ModalMapas from "../Modal/ModalMapas";
import { useMapa } from "../hooks/useMapa";
import GenerarPdf from "../Components/GeneradorPDF/GenerarPdf";

const puntoInicial = {
  lng: -63.1829,
  lat: -17.7891,
  zoom: 13.5,
};

const Mapa = () => {
  const { setRef, coords, area, centro, mapa, extraerCoordenadas } = useMapa(puntoInicial);
  const [openModal, setOpenModal] = useState(false);
  const [kmlFiles, setKmlFiles] = useState([]);

  // Cargar archivos KML
  useEffect(() => {
    const cargarArchivosKML = async () => {
      try {
        const archivosKML = import.meta.glob('../assets/kmls/*.kml');
        const archivosPromesas = [];

        for (const ruta in archivosKML) {
          archivosPromesas.push(
            archivosKML[ruta]().then(modulo => ({
              nombre: ruta.split('/').pop(),
              contenido: modulo.default
            }))
          );
        }

        const resultados = await Promise.all(archivosPromesas);
        setKmlFiles(resultados);
      } catch (error) {
        console.error('Error al cargar archivos KML:', error);
      }
    };

    cargarArchivosKML();
  }, []);

  // Procesar archivos KML
  useEffect(() => {
    if (kmlFiles.length > 0) {
      kmlFiles.forEach(({ contenido }) => {
        extraerCoordenadas(contenido);
      });
    }
  }, [kmlFiles, extraerCoordenadas]);

  const zoomIn = () => {
    if (mapa.current) {
      mapa.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (mapa.current) {
      mapa.current.zoomOut();
    }
  };

  const cambiarEstilo = (estilo) => {
    if (mapa.current) {
      const estilosMapbox = {
        topografico: "mapbox://styles/mapbox/outdoors-v12",
        luciernaga: "mapbox://styles/mapbox/light-v11",
        calles: "mapbox://styles/mapbox/streets-v12",
        satelite: "mapbox://styles/mapbox/satellite-v9",
        dark: "mapbox://styles/mapbox/dark-v11",
      };
      mapa.current.setStyle(estilosMapbox[estilo]);
    }
  };

  return (
    <>
      <ModalMapas
        open={openModal}
        onClose={() => setOpenModal(false)}
        cambiarEstilo={cambiarEstilo}
      />
      <div className="info p-4 bg-gray-800 text-white fixed top-4 left-4 rounded-lg shadow-lg z-10">
        Lng: {coords.lng} | Lat: {coords.lat} | Zoom: {coords.zoom} <br />
        Área: {area} km² <br />
        Centro: {centro ? `${centro[1].toFixed(4)}, ${centro[0].toFixed(4)}` : "N/A"}
      </div>
      {!openModal && (
        <div className="fixed top-4 right-4 z-10">
          <button
            className="px-4 py-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center"
            onClick={() => setOpenModal(true)}
          >
            <FiAlignJustify size={24} />
          </button>
        </div>
      )}

      <div className="fixed left-4 top-32 hover:bg-white border-2 border-white rounded-lg z-10 p-2">
        <button
          className="bg-white font-bold text-3xl hover:bg-orange-600 w-full"
          onClick={zoomIn}
        >
          +
        </button>
        <button
          className="mt-2 bg-white font-bold text-3xl hover:bg-orange-600 w-full"
          onClick={zoomOut}
        >
          -
        </button>
      </div>
{/* 
      <div className="fixed left-6 top-32 hover:bg-white border-2 border-white rounded-lg z-10 p-2">
        <GenerarPdf/>
      </div> */}
      <div className="mapContainer h-screen" ref={setRef} />
    </>
  );
};

export default Mapa;