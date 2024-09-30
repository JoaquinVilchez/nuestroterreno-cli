// /utils/catalogs.ts

import { DataType } from '@/types/dataType';

// Definir un catálogo para todas las entidades
const catalogs: Record<string, DataType> = {
  participantCatalog: {
    key: 'participant',
    endpoint: 'participant', // Endpoint de la API
    label: 'participante', // Nombre para la UI
    route: 'participants', // Ruta del frontend
  },
  lotCatalog: {
    key: 'lot',
    endpoint: 'lot',
    label: 'lote',
    route: 'lots',
  },
  resultCatalog: {
    key: 'result',
    endpoint: 'result',
    label: 'resultado',
    route: 'results',
  },
};

export default catalogs;

export const TranslateCatalog = {
  incumbent: 'titular',
  alternate: 'suplente',
};
