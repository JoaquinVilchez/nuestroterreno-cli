import { atom } from 'recoil';

// Estado para manejar la carga de la API
export const apiLoadingState = atom<boolean>({
  key: 'apiLoadingState',
  default: false,
});

// Estado para manejar errores de la API
export const apiErrorState = atom<string | null>({
  key: 'apiErrorState',
  default: null,
});
