import { Action } from '@/types/action';

export const screens = [
  { id: 'mainScreen', label: 'Pantalla Principal' },
  { id: 'prompter', label: 'Prompter' },
  { id: 'broadcast', label: 'Transmisión' },
] as const;

export type ScreenType = (typeof screens)[number]['id'];

export const actions: Action[] = [
  { id: 'fullInfo', label: 'Información Completa', hide: ['mainScreen'] },
  { id: 'defaultPage', label: 'Placa Fija' }, // No tiene 'hide', está bien porque es opcional
  { id: 'nextDraw', label: 'Próximo Sorteo', hide: ['prompter', 'broadcast'] },
  {
    id: 'lastResults',
    label: 'Últimos Resultados',
    hide: ['mainScreen', 'prompter', 'broadcast'],
  },
  {
    id: 'winnerInfo',
    label: 'Ganador',
    hide: ['mainScreen', 'prompter', 'broadcast'],
  },
  {
    id: 'lastWinner',
    label: 'Último Ganador',
    hide: ['broadcast'],
  },
];

export type ActionType = (typeof actions)[number]['id'];
