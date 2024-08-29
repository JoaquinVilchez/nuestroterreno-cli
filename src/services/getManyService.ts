import apiClient from './apiClient';

// Definir la interfaz para las opciones
interface getManyOptions {
  includes?: string[];
  quantity?: number;
  orderBy?: 'ASC' | 'DESC';
  drawType?: 'CPD' | 'GENERAL';
  resultType?: 'incumbent' | 'alternate';
}

// Tipar la función `getMany`
export const getMany = async (
  endpoint: string,
  options: getManyOptions = {},
) => {
  const { includes = [], quantity, orderBy, drawType, resultType } = options;

  // Construir la URL con los parámetros dinámicos
  const params = new URLSearchParams();

  if (includes.length > 0) params.append('includes', includes.join(','));
  if (quantity !== undefined) params.append('quantity', quantity.toString());
  if (orderBy) params.append('orderBy', orderBy);
  if (drawType) params.append('drawType', drawType);
  if (resultType) params.append('resultType', resultType);

  // Construir la URL final con o sin parámetros
  const url = params.toString()
    ? `/${endpoint}?${params.toString()}`
    : `/${endpoint}`;

  // Realizar la solicitud y devolver los datos
  const { data } = await apiClient.get(url);
  return data;
};
