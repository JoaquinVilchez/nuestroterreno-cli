import { DrawType } from './drawType';
import { Lot } from './lot';
import { Participant } from './participant';
import { ResultType } from './resultType';

export type Result = {
  id: number;
  orderNumber: number;
  participant: Participant;
  lot: Lot;
  group: string;
  drawType: DrawType;
  resultType: ResultType;
};
