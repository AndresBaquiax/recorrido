<template>
    <BaseMap
      ref="baseMap"
      :center="center"
      :zoom="zoom"
      :markers="markers"
      @map-ready="onMapReady"
    >
      <div class="map-controls">
        <button @click="zoomIn">Zoom +</button>
        <button @click="zoomOut">Zoom -</button>
        <button @click="addRandomMarker">Añadir marcador</button>
      </div>
    </BaseMap>
  </template>
  
  <script>
  import BaseMap from './BaseMap.vue';
  import L from 'leaflet';
  
  export default {
    name: 'MapaConControles',
    components: {
      BaseMap
    },
    props: {
      initialCenter: {
        type: Array,
        required: true
      },
      initialZoom: {
        type: Number,
        default: 13
      }
    },
    data() {
      return {
        center: this.initialCenter,
        zoom: this.initialZoom,
        map: null,
        markers: []
      };
    },
    methods: {
      onMapReady(map) {
        this.map = map;
        // Configuración adicional del mapa
        this.map.on('click', this.onMapClick);
      },
      zoomIn() {
        this.zoom++;
        this.map.setZoom(this.zoom);
      },
      zoomOut() {
        this.zoom--;
        this.map.setZoom(this.zoom);
      },
      onMapClick(e) {
        const newMarker = {
          position: [e.latlng.lat, e.latlng.lng],
          popup: `Nuevo marcador en ${e.latlng.lat.toFixed(4)}, ${e.latlng.lng.toFixed(4)}`,
          openPopup: true
        };
        this.markers = [...this.markers, newMarker];
      },
      addRandomMarker() {
        const lat = this.center[0] + (Math.random() - 0.5) * 0.1;
        const lng = this.center[1] + (Math.random() - 0.5) * 0.1;
        const newMarker = {
          position: [lat, lng],
          popup: `Marcador aleatorio en ${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          openPopup: true
        };
        this.markers = [...this.markers, newMarker];
      }
    }
  };
  </script>
  
  <style>
  .map-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0,0,0,0.2);
  }
  
  .map-controls button {
    display: block;
    margin: 5px 0;
  }
  </style>