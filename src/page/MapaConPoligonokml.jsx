import React, { useEffect, useState } from 'react';
import { useMapBoxkml } from '../hooks/useMapBoxkml';

const MapaConPoligonokml = () => {
  const [kmlFiles, setKmlFiles] = useState([]);
  
  const puntoInicial = {
    lng: -63.1829,
    lat: -17.7891,
    zoom: 13.5,
  };

  const { mapContainerRef, extraerCoordenadas } = useMapBoxkml(puntoInicial);

  useEffect(() => {
    // Función para cargar los archivos KML dinámicamente
    const cargarArchivosKML = async () => {
      try {
        // Importar todos los archivos KML dinámicamente
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

  useEffect(() => {
    // Procesar los archivos KML una vez que estén cargados
    if (kmlFiles.length > 0) {
      kmlFiles.forEach(({ contenido }) => {
        extraerCoordenadas(contenido);
      });
    }
  }, [kmlFiles, extraerCoordenadas]);

  return (
    <div className="relative w-full h-screen">
      <div ref={mapContainerRef} className="w-full h-full" />
      
    </div>
  );
};

export default MapaConPoligonokml;