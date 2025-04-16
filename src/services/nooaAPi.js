import axios from 'axios';

const API_URL = 'https://www.ncei.noaa.gov/access/services/data/v2';
const TOKEN = 'MSAOsuxzwlnQmTJPJJdDvvkoxmuFFMlGo';

export const getNoaaData = async (startDate, endDate, stationId) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        dataset: 'global-hourly',
        stations: stationId,
        startDate: startDate,
        endDate: endDate,
        dataTypes: 'TEMP,WT01,PRCP,WTEU',
        format: 'json',
        units: 'metric',
        includeStationName: true,
        token: TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching NOAA data:', error);
    throw error;
  }
};
