import { Action } from '@/types/action';

export const screens = [
  { id: 'mainScreen', label: 'Pantalla Principal' },
  { id: 'prompter', label: 'Prompter' },
  { id: 'broadcast', label: 'Transmisión' },
] as const;

export type ScreenType = (typeof screens)[number]['id'];

export const actions: Action[] = [
  { id: 'fullInfo', label: 'Automático', hide: ['mainScreen', 'broadcast'] },
  { id: 'defaultPage', label: 'Placa Fija', hide: ['broadcast'] },
  { id: 'nextDraw', label: 'Próximo Sorteo', hide: ['prompter'] },
  { id: 'nextCategory', label: 'Próxima Categoría', hide: ['prompter'] },
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
  {
    id: 'qrPage',
    label: 'QR Web',
    hide: ['prompter'],
  },
  {
    id: 'hideContent',
    label: 'Limpiar',
    hide: ['mainScreen', 'prompter'],
  },
];

export type ActionType = (typeof actions)[number]['id'];
