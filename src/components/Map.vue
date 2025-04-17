<template>
    <div id="map-container">
      <div id="map"></div>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    name: 'MapComponent',
    setup() {
      onMounted(() => {
        //Coordenadas: 14°50'02.0"N 91°31'05.6"W
        const coordenadas = [14.8338889, -91.5182222];
        const zoom = 17;
        // Inicializar el mapa
        const map = L.map('map').setView(coordenadas, zoom); // Latitud, Longitud, Zoom
  
        // Añadir capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
  
        // Añadir un marcador
        L.marker(coordenadas).addTo(map)
          .bindPopup('Quetzaltenango')
          .openPopup();
      });
  
      return {};
    }
  };
  </script>
  
  <style>
  #map-container {
    height: 100vh;
    width: 100%;
  }
  
  #map {
    height: 100%;
    width: 100%;
  }
  </style>