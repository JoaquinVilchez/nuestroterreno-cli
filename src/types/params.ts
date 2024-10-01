import { DrawType } from './drawType';
import { ResultType } from './resultType';

export interface Params {
  resultType?: ResultType;
  group?: string;
  drawType?: DrawType;
  quantity?: number;
}
