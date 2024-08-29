import { DrawType } from './drawType';

export type Participant = {
  id: number;
  ballNumber: number;
  firstName: string;
  lastName: string;
  dni: string;
  group: number;
  type: DrawType;
};
