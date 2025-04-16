<template>
  <div id="app">
    <WeatherWidget />
    <MapTail />
    <nooaAPI />
  </div>
</template>

<script>
import WeatherWidget from './components/weatherWidget.vue';
import MapTail from './components/mapTail.vue';
import nooaAPI from './components/nooaWeather.vue';

export default {
  components: {
    WeatherWidget,
    MapTail,
    nooaAPI
  }
};
</script>

