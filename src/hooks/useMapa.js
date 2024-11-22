import mapboxgl from "mapbox-gl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import * as turf from "@turf/turf";
import * as toGeoJSON from '@mapbox/togeojson';

mapboxgl.accessToken = "pk.eyJ1Ijoicm9uYWxkdWFncm0iLCJhIjoiY20yYWx3OHJiMDByYzJrcHZoeTVvNnp0aCJ9.N_Fx7zp5gnPQQ2YU8qriFw";

// Hook combinado que maneja tanto el dibujo manual como la carga de KML
export const useMapa = (puntoInicial) => {

    const dibujadosRef = useRef(new Set());


  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  }, []);

  const marcadores = useRef({});
  const [coords, setCoords] = useState(puntoInicial);
  const puntos = useRef([]);
  const mapa = useRef();
  const [area, setArea] = useState(0);
  const [centro, setCentro] = useState(null);
  const sourcesRef = useRef(new Set());

  // Inicialización del mapa
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    mapa.current = map;
  }, [puntoInicial]);

  
  // Seguimiento de coordenadas
  
  useEffect(() => {
    mapa.current?.on("move", () => {
      const { lng, lat } = mapa.current.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current.getZoom().toFixed(2),
      });
    });
  }, []);

  // Función para dibujar polígono manual
  const dibujarPoligono = useCallback(() => {
    if (puntos.current.length < 3) return;

    const coordenadasCerradas = [...puntos.current, puntos.current[0]];
    const polygon = turf.polygon([coordenadasCerradas]);
    const areaKm2 = turf.area(polygon) / 1000000;
    setArea(areaKm2.toFixed(2));

    const centro = turf.center(polygon).geometry.coordinates;
    setCentro(centro);

    if (mapa.current.getSource("poligono-puntos")) {
      mapa.current.removeLayer("borde-poligono");
      mapa.current.removeLayer("poligono-puntos");
      mapa.current.removeSource("poligono-puntos");
    }

    mapa.current.addSource("poligono-puntos", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordenadasCerradas],
        },
      },
    });

    mapa.current.addLayer({
      id: "poligono-puntos",
      type: "fill",
      source: "poligono-puntos",
      paint: {
        "fill-color": "#888",
        "fill-opacity": 0.5,
      },
    });

    mapa.current.addLayer({
      id: "borde-poligono",
      type: "line",
      source: "poligono-puntos",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#000",
        "line-width": 2,
        "line-dasharray": [4, 2],
      },
    });

    if (centro) {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(centro)
        .addTo(mapa.current);
    }
  }, []);

  // Manejador de clicks para dibujo manual
  useEffect(() => {
    mapa.current?.on("click", (ev) => {
      const { lng, lat } = ev.lngLat;

      if (puntos.current.length > 0) {
        const [lngInicial, latInicial] = puntos.current[0];
        const distancia = Math.sqrt(
          Math.pow(lng - lngInicial, 2) + Math.pow(lat - latInicial, 2)
        );

        if (distancia < 0.001) {
          dibujarPoligono();
          return;
        }
      }

      const marker = new mapboxgl.Marker();
      marker.id = v4();
      marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);
      marcadores.current[marker.id] = marker;
      puntos.current.push([lng, lat]);
    });
  }, [dibujarPoligono]);

  // Función para procesar archivos KML
  const extraerCoordenadas = async (archivoKML) => {
    try {
      const respuesta = await fetch(archivoKML);
      const kmlTexto = await respuesta.text();
      const parser = new DOMParser();
      const kmlDoc = parser.parseFromString(kmlTexto, 'text/xml');
      const geoJSON = toGeoJSON.kml(kmlDoc);
      
      let coordenadas = [];
      geoJSON.features.forEach(feature => {
        if (feature.geometry.type === "Point") {
          coordenadas.push(feature.geometry.coordinates);
        }
      });

      if (coordenadas.length > 2) {
        coordenadas.push(coordenadas[0]);
        const identificador = Date.now().toString();
        
        if (mapa.current.loaded()) {
          dibujarPoligonoKML(coordenadas, identificador);
        } else {
          mapa.current.once('load', () => {
            dibujarPoligonoKML(coordenadas, identificador);
          });
        }
      }

      return coordenadas;
    } catch (error) {
      console.error("Error al procesar KML:", error);
      throw error;
    }
  };

  const dibujarPoligonoKML = (coordenadas, identificador) => {
    const sourceId = `polygon-source-${identificador}`;
    const fillLayerId = `polygon-fill-${identificador}`;
    const outlineLayerId = `polygon-outline-${identificador}`;
  
    // Verificar si la fuente ya existe
    if (mapa.current.getSource(sourceId)) {
      // Actualizar los datos de la fuente existente
      mapa.current.getSource(sourceId).setData({
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordenadas],
        },
      });
      return; // Salir para evitar añadir capas duplicadas
    }
  
    // Añadir nueva fuente
    mapa.current.addSource(sourceId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordenadas],
        },
      },
    });
  
    sourcesRef.current.add(sourceId);
  
    // Añadir capa de relleno
    if (!mapa.current.getLayer(fillLayerId)) {
      mapa.current.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: sourceId,
        paint: {
          'fill-color': '#000000',
          'fill-opacity': 0.2,
        },
      });
    }
  
    // Añadir capa de contorno
    if (!mapa.current.getLayer(outlineLayerId)) {
      mapa.current.addLayer({
        id: outlineLayerId,
        type: 'line',
        source: sourceId,
        paint: {
          'line-color': '#008005',
          'line-width': 4,
        },
      });
    }
  };

  // Función para limpiar polígonos
  const limpiarPoligonos = () => {
    sourcesRef.current.forEach(sourceId => {
      if (mapa.current.getSource(sourceId)) {
        const fillLayerId = `polygon-fill-${sourceId.split('-').pop()}`;
        const outlineLayerId = `polygon-outline-${sourceId.split('-').pop()}`;
        
        if (mapa.current.getLayer(fillLayerId)) {
          mapa.current.removeLayer(fillLayerId);
        }
        if (mapa.current.getLayer(outlineLayerId)) {
          mapa.current.removeLayer(outlineLayerId);
        }
        mapa.current.removeSource(sourceId);
      }
    });
    sourcesRef.current.clear();
  };

  return {
    coords,
    setRef,
    marcadores,
    area,
    centro,
    mapa,
    extraerCoordenadas,
    limpiarPoligonos
  };
};