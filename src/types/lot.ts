import { DrawType } from './drawType';

export type Lot = {
  id: number;
  group: number;
  drawType: DrawType;
  denomination: string;
};
