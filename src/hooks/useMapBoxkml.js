import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as toGeoJSON from '@mapbox/togeojson';

mapboxgl.accessToken = "pk.eyJ1Ijoicm9uYWxkdWFncm0iLCJhIjoiY20yYWx3OHJiMDByYzJrcHZoeTVvNnp0aCJ9.N_Fx7zp5gnPQQ2YU8qriFw";

export const useMapBoxkml = (puntoInicial) => {
    const mapContainerRef = useRef(null);
    const mapaRef = useRef(null);
    const sourcesRef = useRef(new Set()); // Para trackear las fuentes añadidas

    useEffect(() => {
      if (mapaRef.current) return;
  
      mapaRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11", 
        center: [puntoInicial.lng, puntoInicial.lat],
        zoom: puntoInicial.zoom
      });

      mapaRef.current.on('load', () => {
        console.log('Mapa cargado');
      });
    }, [puntoInicial]);
  
    const dibujarPoligono = (coordenadas, identificador) => {
      const sourceId = `polygon-source-${identificador}`;
      const fillLayerId = `polygon-fill-${identificador}`;
      const outlineLayerId = `polygon-outline-${identificador}`;

      // Si la fuente ya existe, actualizar en lugar de crear nueva
      if (mapaRef.current.getSource(sourceId)) {
        const source = mapaRef.current.getSource(sourceId);
        source.setData({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coordenadas]
          }
        });
        return;
      }

      // Agregar nueva fuente y capas
      mapaRef.current.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [coordenadas]
          }
        }
      });

      sourcesRef.current.add(sourceId);

      // Agregar capa de relleno con color aleatorio
      // const randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
      
      mapaRef.current.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0.3
        }
      });

      mapaRef.current.addLayer({
        id: outlineLayerId,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': '#008005',
          'line-width': 2
        }
      });
    };

    const extraerCoordenadas = async (archivoKML) => {
      try {
        const respuesta = await fetch(archivoKML);
        const kmlTexto = await respuesta.text();
  
        const parser = new DOMParser();
        const kmlDoc = parser.parseFromString(kmlTexto, 'text/xml');
        const geoJSON = toGeoJSON.kml(kmlDoc);
  
        let coordenadas = [];
        
        // Extraer coordenadas de los puntos
        geoJSON.features.forEach(feature => {
          if (feature.geometry.type === "Point") {
            coordenadas.push(feature.geometry.coordinates);
          }
        });
  
        if (coordenadas.length > 2) {
          coordenadas.push(coordenadas[0]); // Cerrar el polígono
          
          const identificador = Date.now().toString(); // Identificador único para cada polígono
          
          if (mapaRef.current.loaded()) {
            dibujarPoligono(coordenadas, identificador);
          } else {
            mapaRef.current.once('load', () => {
              dibujarPoligono(coordenadas, identificador);
            });
          }
        }
  
        return coordenadas;
      } catch (error) {
        console.error("Error al procesar KML:", error);
        throw error;
      }
    };

    // Función para limpiar todos los polígonos
    const limpiarPoligonos = () => {
      sourcesRef.current.forEach(sourceId => {
        if (mapaRef.current.getSource(sourceId)) {
          const fillLayerId = `polygon-fill-${sourceId.split('-').pop()}`;
          const outlineLayerId = `polygon-outline-${sourceId.split('-').pop()}`;
          
          if (mapaRef.current.getLayer(fillLayerId)) {
            mapaRef.current.removeLayer(fillLayerId);
          }
          if (mapaRef.current.getLayer(outlineLayerId)) {
            mapaRef.current.removeLayer(outlineLayerId);
          }
          mapaRef.current.removeSource(sourceId);
        }
      });
      sourcesRef.current.clear();
    };
    
    return {
      mapContainerRef,
      mapaRef,
      extraerCoordenadas,
      limpiarPoligonos
    };
};