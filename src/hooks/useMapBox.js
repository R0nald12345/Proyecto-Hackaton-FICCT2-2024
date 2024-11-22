


import mapboxgl from "mapbox-gl";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import * as turf from "@turf/turf";

// TODO: Cambiar API KEY
mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9uYWxkdWFncm0iLCJhIjoiY20yYWx3OHJiMDByYzJrcHZoeTVvNnp0aCJ9.N_Fx7zp5gnPQQ2YU8qriFw";

export const useMapBox = (puntoInicial) => {
  // Referencia al Div del mapa
  const mapaDiv = useRef();
  const setRef = useCallback((node) => {
    mapaDiv.current = node;
  });

  // Referencia a los marcadores
  const marcadores = useRef({});
  const [coords, setCoords] = useState(puntoInicial);

  // Guardar las coordenadas de los puntos para dibujar el polígono
  const puntos = useRef([]);

  const mapa = useRef();
  const [area, setArea] = useState(0);
  const [centro, setCentro] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapaDiv.current, // container ID
      center: [puntoInicial.lng, puntoInicial.lat], // starting position [lng, lat]
      zoom: puntoInicial.zoom, // starting zoom
    });

    mapa.current = map;
  }, [puntoInicial]);

  // Cuando se mueve el Mapa
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

  // Dibujar el polígono cerrado y calcular área/centro
  const dibujarPoligono = useCallback(() => {
    if (puntos.current.length < 3) return; // No se puede cerrar un polígono con menos de 3 puntos

    // Añadir el punto inicial al final para cerrar el polígono
    const coordenadasCerradas = [...puntos.current, puntos.current[0]];

    // Crear un objeto GeoJSON del polígono
    const polygon = turf.polygon([coordenadasCerradas]);

    // Calcular el área en kilómetros cuadrados
    const areaKm2 = turf.area(polygon) / 1000000; // Convertir de m² a km²
    setArea(areaKm2.toFixed(2));

    // Calcular el punto central del polígono
    const centro = turf.center(polygon).geometry.coordinates;
    setCentro(centro);

    // Si ya hay un polígono dibujado, lo removemos antes de dibujar el nuevo
    if (mapa.current.getSource("poligono-puntos")) {
      mapa.current.removeLayer("poligono-puntos");
      mapa.current.removeSource("poligono-puntos");
    }

    mapa.current.addSource("poligono-puntos", {
      type: "geojson",
      data: {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [coordenadasCerradas], // Mapbox espera un array de arrays para polígonos
        },
      },
    });

    mapa.current.addLayer({
      id: "poligono-puntos",
      type: "fill",
      source: "poligono-puntos",
      layout: {},
      paint: {
        "fill-color": "#888",
        "fill-opacity": 0.5,
      },
    });

    // También agregar un borde segmentado al polígono
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
        "line-dasharray": [4, 2], // Aquí se define el patrón segmentado: [longitud, espacio]
      },
    });

    // Agregar un marcador en el punto central
    if (centro) {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat(centro)
        .addTo(mapa.current);
    }
  }, []);

  // Agregar Marcadores cuando hago click
  useEffect(() => {
    mapa.current?.on("click", (ev) => {
      const { lng, lat } = ev.lngLat;

      // Verificar si el clic es cercano al primer punto para cerrar el polígono
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
      marker.id = v4(); // Generar un ID único para el marcador

      marker.setLngLat([lng, lat]).addTo(mapa.current).setDraggable(true);

      marcadores.current[marker.id] = marker;

      // Agregar el punto al array de puntos
      puntos.current.push([lng, lat]);
    });
  }, [dibujarPoligono]);

  return {
    coords,
    setRef,
    marcadores,
    area,
    centro,
    mapa
  };
};

