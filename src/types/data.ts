import { DrawType } from './drawType';
import { Lot } from './lot';
import { Params } from './params';
import { Participant } from './participant';
import { Result } from './result';
import { ResultType } from './resultType';

export interface Data {
  participant?: Participant;
  lot?: Lot;
  group?: string;
  drawType?: DrawType;
  resultType?: ResultType;
  orderNumber?: number;
  params?: Params;
  results?: Result[];
  nextDraw?: {
    lot?: Lot;
    orderNumber?: number;
    resultType: ResultType;
    group: string;
    drawType: DrawType;
    drawNumber: number;
    quantity: number;
  };
  lastResults?: Result[];
  // Agrega otras propiedades si las hay
}
