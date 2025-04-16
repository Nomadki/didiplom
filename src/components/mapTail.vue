<template>
    <div id="map" class="map-container"></div>
</template>
  
  <script>
  import L from 'leaflet';
  
  export default {
    name: 'MapView',
    mounted() {
      const map = L.map('map').setView([20, 0], 2); 
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
    },
  };
  </script>
  
  <style scoped>
  .map-container {
    height: 600px;
    width: 600px;
  }
  </style>
  