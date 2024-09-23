// src/utils/typeGuards.ts
import { Result } from '@/types/result';
import { Lot } from '@/types/lot';

// Type guard para verificar si es un arreglo de Result
export function isResultArray(data: any): data is Result[] {
  return Array.isArray(data) && data.every((item) => item.hasOwnProperty('id'));
}

// Type guard para verificar si es un Lot
export function isLot(data: any): data is Lot {
  return data !== null && typeof data === 'object' && 'denomination' in data;
}
