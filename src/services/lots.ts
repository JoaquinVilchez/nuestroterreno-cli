// src/services/lots.ts
import apiClient from './apiClient';

export const fetchLots = async () => {
  const { data } = await apiClient.get('/lot');
  return data;
};
