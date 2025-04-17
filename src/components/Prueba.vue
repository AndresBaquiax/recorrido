<template>
    <MapaConRuta ref="mapa" />
  </template>
  
  <script>
  export default {
    mounted() {
      const puntosPersonalizados = [
        [14.8338889, -91.5182222],
        [14.8340, -91.5185],
        [14.8345, -91.5190],
        [14.8350, -91.5200]
      ];
      this.$refs.mapa.establecerPuntosRuta(puntosPersonalizados);
    }
  }
  </script>