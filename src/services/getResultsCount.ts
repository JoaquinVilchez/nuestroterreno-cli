// src/services/yourServiceFile.ts

import apiClient from './apiClient';

export const getResultsCount = async (): Promise<number> => {
  try {
    const { data } = await apiClient.get(`/result/count`);
    return data; // Accedemos a `data.data` ya que la respuesta tiene `{ status, data }`
  } catch (err) {
    throw err;
  }
};
