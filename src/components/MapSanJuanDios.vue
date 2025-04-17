<template>
    <div>
      <!-- Contenedor del mapa -->
      <div ref="mapContainer" class="map-container"></div>
      
      <!-- Controles -->
      <div class="map-controls">
        <div v-if="cargando" class="cargando">Calculando ruta...</div>
      </div>
      <div>
        <button class="control-btn" @click="iniciarAnimacionRecorrido(1)">
        Iniciar Animación
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import iconoRuta from '../assets/location.png';
  import L from 'leaflet';
  import 'leaflet/dist/leaflet.css';
  
  export default {
    name: 'MapaConRutaCompleto',
    data() {
      return {
        map: null,
        movilMarker: null,
        recorridoLayer: null,
        markers: [],
        cargando: false,
        puntosRuta: [
        [14.839750, -91.518056],
        [14.840083, -91.517972],
        [14.840056, -91.517778],
        [14.840028, -91.517500],
        [14.839972, -91.517333],
        [14.839889, -91.516944],
        [14.839778, -91.516611],
        [14.839667, -91.516278],
        [14.839250, -91.516500],
        [14.838722, -91.516917],
        [14.838417, -91.517111],
        [14.837972, -91.517306],
        [14.837611, -91.517444],
        [14.837028, -91.517639],
        [14.836500, -91.517806],
        [14.836250, -91.517889],
        [14.836000, -91.517944],
        [14.835639, -91.518056],
        [14.835222, -91.518222],
        [14.834917, -91.518333],
        [14.834556, -91.518500],
        [14.834056, -91.518722],
        [14.833639, -91.518861],
        [14.833472, -91.518361],
        [14.834028, -91.518167],
        [14.834528, -91.517972],
        [14.834194, -91.517250],
        [14.834111, -91.517083],
        [14.834000, -91.516833],
        [14.833778, -91.516222],
        [14.833583, -91.515778],
        [14.833417, -91.515306],
        [14.833361, -91.515167],
        [14.833528, -91.514694],
        [14.833833, -91.513750],
        [14.833889, -91.513639],
        [14.834028, -91.513444],
        [14.834278, -91.513083],
        [14.834500, -91.512694],
        [14.834694, -91.512444],
        [14.833722, -91.512417],
        [14.833306, -91.512472],
        [14.832417, -91.512639],
        [14.832389, -91.512722],
        [14.832250, -91.513194],
        [14.832278, -91.513361],
        [14.832417, -91.513806],
        [14.832583, -91.514333],
        [14.832778, -91.514889],
        [14.832972, -91.515444],
        [14.833413, -91.516306],
        [14.833642, -91.516982],
        [14.833765, -91.517397],
        [14.834034, -91.518152],

        [14.834528, -91.517972],
        [14.834778, -91.517917],
        [14.834917, -91.518333],
        [14.835160, -91.518972],
        [14.835329, -91.519473],
        [14.836318, -91.519118],
        [14.836828, -91.518945],
        [14.837394, -91.518763],
        [14.837971, -91.518581],
        [14.838738, -91.518373],
        [14.839290, -91.518210],
        [14.839636, -91.518097],
        [14.839750, -91.518056]

        ]
      };
    },
    mounted() {
      this.inicializarMapa();
    },
    methods: {
        iniciarAnimacionRecorrido(duracionMinutos) {
        if (this.puntosRuta.length < 2) return;

        const duracionTotal = duracionMinutos * 60 * 1000;
        const totalSegmentos = this.puntosRuta.length - 1;
        const duracionPorSegmento = duracionTotal / totalSegmentos;

        // Si ya existe el marcador móvil, lo eliminamos
        if (this.movilMarker) {
            this.map.removeLayer(this.movilMarker);
        }

        // Crear icono personalizado
        const iconoMovil = L.icon({
            iconUrl: iconoRuta,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
        });

        this.movilMarker = L.marker(this.puntosRuta[0], {
            icon: iconoMovil,
        }).addTo(this.map);

        let segmentoActual = 0;
        let inicioSegmento = performance.now();

        const animar = (ahora) => {
            if (segmentoActual >= totalSegmentos) return;

            const progreso = (ahora - inicioSegmento) / duracionPorSegmento;

            const [lat1, lng1] = this.puntosRuta[segmentoActual];
            const [lat2, lng2] = this.puntosRuta[segmentoActual + 1];

            const lat = lat1 + (lat2 - lat1) * progreso;
            const lng = lng1 + (lng2 - lng1) * progreso;

            this.movilMarker.setLatLng([lat, lng]);

            if (progreso >= 1) {
            segmentoActual++;
            inicioSegmento = ahora;
            }

            requestAnimationFrame(animar);
        };

        requestAnimationFrame(animar);
        },
      inicializarMapa() {
        // Crear mapa centrado en el primer punto
        this.map = L.map(this.$refs.mapContainer).setView(this.puntosRuta[0], 15);
        
        // Añadir capa base de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
  
        // Dibujar ruta y marcadores
        this.dibujarRecorrido();
        this.iniciarAnimacionRecorrido(2); // 180 minutos = 3 horas
      },
  
      async obtenerRutaOSRM(puntos) {
        try {
          this.cargando = true;
          const coordenadasOSRM = puntos.map(p => `${p[1]},${p[0]}`).join(';');
          
          const response = await fetch(
            `https://router.project-osrm.org/route/v1/bike/${coordenadasOSRM}?overview=full&geometries=geojson`
          );
          
          if (!response.ok) throw new Error('Error al obtener la ruta');
          
          const data = await response.json();
          return data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
        } catch (error) {
          console.error("Error al calcular la ruta:", error);
          return puntos; // Fallback a línea recta
        } finally {
          this.cargando = false;
        }
      },
  
      dibujarRecorrido() {
        this.limpiarCapas();

        if (this.puntosRuta.length < 2) return;

        const tramo1 = this.puntosRuta.slice(0, 54);
        const tramo2 = this.puntosRuta.slice(53); 

        // Dibujar el primer tramo (rojo)
        const layer1 = L.polyline(tramo1, {
            color: 'red',
            weight: 6,
            opacity: 0.8
        }).addTo(this.map);

        // Dibujar el segundo tramo (azul)
        const layer2 = L.polyline(tramo2, {
            color: 'blue',
            weight: 6,
            opacity: 0.8
        }).addTo(this.map);

        this.recorridoLayer = [layer1, layer2]; // guardar ambos por si quieres limpiarlos después

        // Agregar marcadores
        this.agregarMarcadores();

        // Ajustar vista
        const bounds = L.latLngBounds(this.puntosRuta);
        this.map.fitBounds(bounds);
        },
  
      agregarMarcadores() {
        // Limpiar marcadores antiguos
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
  
        // Añadir nuevos marcadores
        this.puntosRuta.forEach((punto, index) => {
          const marker = L.marker(punto, {
            icon: L.divIcon({
              className: `map-marker marker-${index}`,
              html: `<span>${index + 1}</span>`,
              iconSize: [30, 30]
            })
          })
          
          this.markers.push(marker);
        });
      },
  
      limpiarCapas() {
        if (Array.isArray(this.recorridoLayer)) {
            this.recorridoLayer.forEach(layer => this.map.removeLayer(layer));
        } else if (this.recorridoLayer) {
            this.map.removeLayer(this.recorridoLayer);
        }
        this.recorridoLayer = null;

        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];
      },
  
      establecerPuntosRuta(nuevosPuntos) {
        this.puntosRuta = nuevosPuntos;
        this.dibujarRecorrido();
      }
    }
  };
  </script>
  
  <style>
  .map-container {
    height: 100vh;
    width: 100%;
  }
  
  .ruta-destacada {
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.7));
    stroke-linecap: round;
  }
  
  .map-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .control-btn {
    padding: 8px 16px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }
  
  .control-btn:hover {
    background: #f0f0f0;
  }
  
  .cargando {
    padding: 8px 16px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .map-marker {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ff0000;
    color: white;
    border-radius: 50%;
    font-weight: bold;
  }
  
  .map-marker span {
    position: relative;
    top: -1px;
  }
  </style>