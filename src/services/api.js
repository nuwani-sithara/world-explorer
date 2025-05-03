import axios from 'axios';

const API_URL = 'https://restcountries.com/v3.1';

export const getAllCountries = async () => {
  return await axios.get(`${API_URL}/all`);
};

export const getCountryByName = async (name) => {
  return await axios.get(`${API_URL}/name/${name}`);
};

export const getCountriesByRegion = async (region) => {
  return await axios.get(`${API_URL}/region/${region}`);
};

export const getCountryByCode = async (code) => {
  return await axios.get(`${API_URL}/alpha/${code}`);
};