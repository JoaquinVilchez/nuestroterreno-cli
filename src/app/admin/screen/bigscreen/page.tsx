'use client';

import PageHeader from '@/app/components/PageHeader';
import { Lot } from '@/types/lot';
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

// Definiendo un tipo para el contenido que incluye `null`
interface Content {
  type: 'lastResults' | 'nextLot' | 'defaultPage' | 'none';
  data: Result[] | Lot | any | null; // Aquí permitimos que data sea Result[] o cualquier otro tipo, incluido null
}

export default function ScreenBigScreenPage() {
  const [content, setContent] = useState<Content>({ type: 'none', data: null });

  useEffect(() => {
    console.log('Intentando conectar');
    initiateSocketConnection();

    const handleLastResults = (receivedResults: Result[]) => {
      console.log('Resultados recibidos:', receivedResults);
      setContent({ type: 'lastResults', data: receivedResults });
    };

    const handleNextWinner = (result: any) => {
      // Supongamos que result es un objeto
      console.log('Ganador recibido:', result);
      setContent({ type: 'nextLot', data: result });
    };

    const handleRequestDefaultPage = () => {
      console.log('Mostrando defaultPage');
      setContent({ type: 'defaultPage', data: 'Logo de la Municipalidad' });
    };

    subscribeToEvent('lastResults', handleLastResults);
    subscribeToEvent('nextLot', handleNextWinner);
    subscribeToEvent('defaultPage', handleRequestDefaultPage);

    emitEvent('joinRoom', 'mainData');
    console.log('Emitido joinRoom para la sala bigscreen');

    return () => {
      unsubscribeFromEvent('lastResults');
      unsubscribeFromEvent('nextLot');
      unsubscribeFromEvent('defaultPage');
      disconnectSocket();
    };
  }, []);

  return (
    <Box>
      <PageHeader title="Pantalla principal" showButton={false} />
      {content.data && (
        <Box mt={5}>
          {content.type === 'lastResults' &&
            content.data.map((result: Result) => (
              <Box
                key={result.id}
                p={2}
                borderWidth={1}
                borderRadius="md"
                mb={2}
              >
                <p>ID: {result.lot.denomination}</p>
                {/* Muestra otros campos si es necesario */}
              </Box>
            ))}
          {content.type === 'nextLot' && (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>Ganador: {content.data.name}</p>
              {/* Asume que el objeto ganador tiene una propiedad 'name' */}
            </Box>
          )}
          {content.type === 'defaultPage' && (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>{content.data}</p>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
