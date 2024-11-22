import * as toGeoJSON from "@mapbox/togeojson";
import mapboxgl from 'mapbox-gl';

// Función para dibujar el polígono
const dibujarPoligono = (markers, mapa, poligonoId, featureIndex) => {
  // Eliminar la capa y la fuente existente si ya existen
  if (mapa.getLayer(`${poligonoId}-${featureIndex}`)) {
    mapa.removeLayer(`${poligonoId}-${featureIndex}`);
  }
  if (mapa.getSource(`${poligonoId}-${featureIndex}`)) {
    mapa.removeSource(`${poligonoId}-${featureIndex}`);
  }

  // Obtener las coordenadas actualizadas de los marcadores
  const coordinates = markers.map(marker => marker.getLngLat().toArray());
  
  // Cerrar el polígono agregando el primer punto al final
  coordinates.push(coordinates[0]);

  // Agregar la fuente del polígono
  mapa.addSource(`${poligonoId}-${featureIndex}`, {
    type: 'geojson',
    data: {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [coordinates]
      }
    }
  });

  // Agregar la capa del polígono
  mapa.addLayer({
    id: `${poligonoId}-${featureIndex}`,
    type: 'fill',
    source: `${poligonoId}-${featureIndex}`,
    paint: {
      'fill-color': '#088',
      'fill-opacity': 0.4,
      'fill-outline-color': 'red'
    }
  });

  // Agregar una capa de línea para el contorno
  mapa.addLayer({
    id: `${poligonoId}-${featureIndex}-line`,
    type: 'line',
    source: `${poligonoId}-${featureIndex}`,
    paint: {
      'line-color': 'red',
      'line-width': 2
    }
  });
};

// Función para actualizar el polígono cuando se mueve un marcador
const actualizarPoligono = (markers, mapa, poligonoId, featureIndex) => {
  dibujarPoligono(markers, mapa, poligonoId, featureIndex);
};

export const cargarPoligonosDesdeKML = async (rutaKML, mapa, poligonoId) => {
  try {
    console.log("Iniciando carga del archivo KML desde:", rutaKML);

    const response = await fetch(rutaKML);
    const kmlString = await response.text();

    // Convertir KML a GeoJSON
    const parser = new DOMParser();
    const kmlDocument = parser.parseFromString(kmlString, "text/xml");
    const geojson = toGeoJSON.kml(kmlDocument);

    let contadorPoligonos = 0; // Inicializa el contador

    // Procesar cada polígono
    geojson.features.forEach((feature, featureIndex) => {
      if (feature.geometry.type === "Polygon") {
        contadorPoligonos++; // Incrementa el contador por cada polígono encontrado

        const coordinates = feature.geometry.coordinates[0]; // Obtenemos las coordenadas del polígono
        const markers = [];

        // Crear marcadores en cada coordenada
        coordinates.forEach((coord, index) => {
          const marker = new mapboxgl.Marker({
            color: "#FF0000",
            draggable: true,
          })
            .setLngLat(coord)
            .addTo(mapa);

          markers.push(marker);

          // Actualizar el polígono cuando se mueva un marcador
          marker.on("dragend", () =>
            actualizarPoligono(markers, mapa, poligonoId, featureIndex)
          );
        });

        // Dibujar el polígono inicial
        dibujarPoligono(markers, mapa, poligonoId, featureIndex);
      }
    });

    return contadorPoligonos; // Devuelve el número total de polígonos cargados
  } catch (error) {
    console.error("Error:", error);
    return 0; // Devuelve 0 en caso de error
  }
};
