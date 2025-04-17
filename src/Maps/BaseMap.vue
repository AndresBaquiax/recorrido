<template>
    <div class="map-container">
      <div ref="mapElement" class="map"></div>
      <slot></slot>
    </div>
  </template>
  
  <script>
  import { onMounted, onBeforeUnmount, ref } from 'vue';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    name: 'BaseMap',
    props: {
      center: {
        type: Array,
        required: true,
        validator: (value) => value.length === 2 && typeof value[0] === 'number' && typeof value[1] === 'number'
      },
      zoom: {
        type: Number,
        default: 13
      },
      tileLayer: {
        type: String,
        default: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      },
      attribution: {
        type: String,
        default: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      },
      markers: {
        type: Array,
        default: () => []
      }
    },
    setup(props, { emit }) {
      const mapElement = ref(null);
      let map = null;
      let tileLayer = null;
      const markers = ref([]);
  
      onMounted(() => {
        // Inicializar el mapa
        map = L.map(mapElement.value).setView(props.center, props.zoom);
  
        // Añadir capa base
        tileLayer = L.tileLayer(props.tileLayer, {
          attribution: props.attribution
        }).addTo(map);
  
        // Añadir marcadores si existen
        if (props.markers.length > 0) {
          addMarkers(props.markers);
        }
  
        // Emitir evento cuando el mapa esté listo
        emit('map-ready', map);
      });
  
      onBeforeUnmount(() => {
        if (map) {
          map.remove();
        }
      });
  
      const addMarkers = (markerData) => {
        // Limpiar marcadores existentes
        clearMarkers();
  
        markerData.forEach(marker => {
          const newMarker = L.marker(marker.position, marker.options)
            .addTo(map)
            .bindPopup(marker.popup || '');
  
          if (marker.openPopup) {
            newMarker.openPopup();
          }
  
          markers.value.push(newMarker);
        });
      };
  
      const clearMarkers = () => {
        markers.value.forEach(marker => map.removeLayer(marker));
        markers.value = [];
      };
  
      return {
        mapElement
      };
    }
  };
  </script>
  
  <style>
  .map-container {
    height: 100%;
    width: 100%;
  }
  
  .map {
    height: 100%;
    min-height: 700px;
    width: 100%;
  }
  </style>