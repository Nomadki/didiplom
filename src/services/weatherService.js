import axios from 'axios';

const API_KEY = '755992c7b80a464895a73d48f9bd1bd8'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeather = async (city) => {
  try {
    console.log('Отправляю запрос на получение погоды для города:', city);
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,            
        appid: API_KEY,      
        units: 'metric',    
        lang: 'ru'           
      }
    });

    console.log('Ответ от OpenWeather:', response.data);

    return {
      name: response.data.name,
      temperature: Math.round(response.data.main.temp),
      condition: response.data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    };
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    
    if (error.response) {
      console.error('Ответ с ошибкой от API:', error.response.data);
      console.error('Код ошибки:', error.response.status);
    } else if (error.request) {
      console.error('Ошибка с запросом:', error.request);
    } else {
      console.error('Ошибка в настройке запроса:', error.message);
    }

    throw error; 
  }
};
