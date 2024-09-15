'use client';

import PageHeader from '@/app/components/PageHeader';
import { Result } from '@/types/result';
import {
  disconnectSocket,
  initiateSocketConnection,
  subscribeToEvent,
  unsubscribeFromEvent,
  emitEvent,
} from '@/utils/socket';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function ScreenBigScreenPage() {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    console.log('Intentando conectar');
    initiateSocketConnection();

    // Suscribirse al evento 'lastResults'
    subscribeToEvent('lastResults', (receivedResults: Result[]) => {
      console.log('Resultados recibidos:', receivedResults);
      setResults(receivedResults); // Actualiza el estado con los resultados recibidos
    });

    // Emitir 'joinRoom' para unirse a la sala 'mainData'
    emitEvent('joinRoom', 'mainData');
    console.log('Emitido joinRoom para la sala bigscreen');

    return () => {
      // Desuscribirse del evento al desmontar el componente
      unsubscribeFromEvent('lastResults');
      disconnectSocket();
    };
  }, []);

  return (
    <Box>
      {results.length > 0 && (
        <Box mt={5}>
          <PageHeader title="Resultados" />
          {results.map((result) => (
            <Box key={result.id} p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>ID: {result.id}</p>
              {/* Muestra otros campos si es necesario */}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
