<template>
    <BaseMap
      :center="center"
      :zoom="zoom"
      :markers="markers"
    />
  </template>
  
  <script>
  import BaseMap from './BaseMap.vue';
  
  export default {
    name: 'MapaSimple',
    components: {
      BaseMap
    },
    props: {
      center: {
        type: Array,
        required: true
      },
      zoom: {
        type: Number,
        default: 13
      },
      markers: {
        type: Array,
        default: () => []
      }
    }
  };
  </script>