export const screens = [
  { id: 'mainScreen', label: 'Pantalla Principal' },
  { id: 'prompter', label: 'Prompter' },
  { id: 'broadcast', label: 'Transmisión' },
] as const;

export type ScreenType = (typeof screens)[number]['id'];

export const actions = [
  { id: 'lastResults', label: 'Últimos Resultados' },
  { id: 'nextLot', label: 'Próximo Sorteo' },
  { id: 'defaultPage', label: 'Placa Fija' },
] as const;

export type ActionType = (typeof actions)[number]['id'];
