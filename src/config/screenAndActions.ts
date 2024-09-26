import { Action } from '@/types/action';

export const screens = [
  { id: 'mainScreen', label: 'Pantalla Principal' },
  { id: 'prompter', label: 'Prompter' },
  { id: 'broadcast', label: 'Transmisión' },
] as const;

export type ScreenType = (typeof screens)[number]['id'];

export const actions: Action[] = [
  {
    id: 'lastResults',
    label: 'Últimos Resultados',
    hide: ['prompter', 'broadcast'],
  },
  { id: 'nextDraw', label: 'Próximo Sorteo', hide: ['prompter', 'broadcast'] },
  { id: 'defaultPage', label: 'Placa Fija' }, // No tiene 'hide', está bien porque es opcional
  { id: 'fullInfo', label: 'Información Completa', hide: ['mainScreen'] },
  {
    id: 'winnerInfo',
    label: 'Último Ganador',
    hide: ['mainScreen', 'prompter', 'broadcast'],
  },
];

export type ActionType = (typeof actions)[number]['id'];
