// src/services/yourServiceFile.ts

import apiClient from './apiClient';
import { NextDrawType } from '@/types/nextDraw';

interface ApiResponse {
  status: string;
  data: NextDrawType;
}

export const getNextDraw = async (): Promise<NextDrawType> => {
  try {
    const { data } = await apiClient.get<ApiResponse>(`/result/next-draw`);
    return data.data; // Accedemos a `data.data` ya que la respuesta tiene `{ status, data }`
  } catch (err) {
    throw err;
  }
};
