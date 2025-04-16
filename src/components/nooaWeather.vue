<template>
  <div>
    <h2>Данные NOAA</h2>

    <!-- Форма для ввода параметров -->
    <form @submit.prevent="fetchData">
      <div>
        <label for="startDate">Дата начала:</label>
        <input type="date" v-model="startDate" id="startDate" required />
      </div>
      
      <div>
        <label for="endDate">Дата окончания:</label>
        <input type="date" v-model="endDate" id="endDate" required />
      </div>
      
      <div>
        <label for="stationId">ID станции:</label>
        <input type="text" v-model="stationId" id="stationId" required />
      </div>
      
      <button type="submit">Получить данные</button>
    </form>

    <!-- Сообщение о загрузке -->
    <div v-if="loading">Загрузка...</div>
    
    <!-- Ошибка при загрузке -->
    <div v-if="error" class="error">Произошла ошибка при загрузке данных.</div>
    
    <!-- Таблица с данными, если они есть -->
    <div v-if="data.length > 0">
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Температура воздуха (°C)</th>
            <th>Скорость течений (м/с)</th>
            <th>Осадки (мм)</th>
            <th>Температура воды (°C)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in data" :key="index">
            <td>{{ item.date }}</td>
            <td>{{ item.TEMP }}</td>
            <td>{{ item.WT01 }}</td>
            <td>{{ item.PRCP }}</td>
            <td>{{ item.WTEU }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getNoaaData } from '../services/nooaAPi';

export default {
  data() {
    return {
      data: [],
      loading: false,
      error: false,
      startDate: '2024-01-01', // Дефолтная дата начала
      endDate: '2024-01-02',   // Дефолтная дата окончания
      stationId: '9414290',    // Дефолтный ID станции
    };
  },
  methods: {
    async fetchData() {
      this.loading = true;
      this.error = false;
      try {
        const result = await getNoaaData(this.startDate, this.endDate, this.stationId);
        this.data = result;
      } catch (err) {
        this.error = true;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    this.fetchData(); // Загружаем данные при монтировании компонента
  },
};
</script>

<style scoped>
.error {
  color: red;
}
table {
  width: 100%;
  border-collapse: collapse;
}
table, th, td {
  border: 1px solid #ddd;
}
th, td {
  padding: 8px;
  text-align: center;
}
form {
  margin-bottom: 20px;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input[type="date"],
input[type="text"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
}
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
