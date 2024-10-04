// src/types/nextDraw.ts

import { DrawType } from './drawType';
import { ResultType } from './resultType';
import { Lot } from './lot';

export interface NextDrawType {
  group: number;
  lot?: Lot | null;
  drawType: DrawType;
  resultType: ResultType;
  quantity: number;
  drawNumber: number;
  orderNumber?: number | null;
}
