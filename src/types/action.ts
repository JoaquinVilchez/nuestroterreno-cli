import { ScreenType } from '@/config/screenAndActions';

export type Action = {
  id: string;
  label: string;
  hide?: ScreenType[];
};
