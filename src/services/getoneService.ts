import apiClient from './apiClient';

// Tipar la función `getMany`
export const getOne = async (endpoint: string) => {
  const params = new URLSearchParams();

  const url = params.toString()
    ? `/${endpoint}?${params.toString()}`
    : `/${endpoint}`;

  // Realizar la solicitud y devolver los datos
  const { data } = await apiClient.get(url);
  return data;
};
