<template>
    <div class="weather-list">
      <ul>
        <li v-for="(city, index) in portCities" :key="index" class="city-weather-item">
          <h4>{{ city.name }}</h4>
          <div v-if="city.weather">
            <img :src="city.weather.icon" alt="Погода" />
            <p>{{ city.weather.temperature }}°C</p>
            <p class="condition">{{ city.weather.condition }}</p>
          </div>
          <div v-else-if="city.error">
            <p>Ошибка: {{ city.error }}</p>
          </div>
          <div v-else>
            <p>Загрузка...</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { fetchWeather } from '@/services/weatherService.js';
  
  export default {
    data() {
      return {
        portCities: [
          { name: "Amsterdam", weather: null, error: null },
          { name: "Barcelona", weather: null, error: null },
          { name: "New York", weather: null, error: null },
          { name: "San Francisco", weather: null, error: null },
          { name: "Singapore", weather: null, error: null },
          { name: "Hamburg", weather: null, error: null },
          { name: "Rotterdam", weather: null, error: null },
          { name: "Hong Kong", weather: null, error: null },
          { name: "Sydney", weather: null, error: null },
          { name: "Dubai", weather: null, error: null }
        ]
      };
    },
    async created() {
      for (const city of this.portCities) {
        try {
          city.weather = await fetchWeather(city.name);
        } catch (err) {
          console.error(`Ошибка при загрузке погоды для города ${city.name}:`, err);
          city.error = 'Не удалось загрузить данные о погоде.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .weather-list {
    position: fixed;        /* Фиксируем элемент на экране */
    top: 10px;              /* Располагаем в верхнем углу */
    right: 10px;            /* Сдвигаем в правый угол */
    width: 180px;           /* Уменьшаем ширину списка */
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7); /* Полупрозрачный фон */
    border-radius: 10px;
    color: white;           /* Белый цвет текста */
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    font-family: sans-serif;
    max-height: 400px;      /* Ограничиваем высоту */
    overflow-y: auto;       /* Прокрутка по вертикали, если список длинный */
  }
  
  .city-weather-item {
    padding: 5px;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }
  
  .city-weather-item img {
    width: 40px;            /* Уменьшаем размер иконки */
  }
  
  .condition {
    font-size: 0.75rem;     /* Уменьшаем размер текста для описания */
    color: #ddd;            /* Светлый цвет для текста описания */
  }
  
  .city-weather-item p {
    margin: 5px 0;
  }
  
  .city-weather-item h4 {
    font-size: 1rem;
    margin: 5px 0;
  }
  </style>
  
  
  