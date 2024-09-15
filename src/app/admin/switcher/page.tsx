'use client';

import ButtonComponent from '@/app/components/Button';
import PageHeader from '@/app/components/PageHeader';
import {
  disconnectSocket,
  emitEvent,
  initiateSocketConnection,
} from '@/utils/socket';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import { Suspense, useEffect } from 'react';

export default function ResultsPage() {
  useEffect(() => {
    initiateSocketConnection();

    return () => {
      disconnectSocket();
    };
  }, []);

  const getLastFiveResults = () => {
    emitEvent('requestLastResults', 5);
    console.log('Emitido requestLastResults con cantidad 5');
  };

  const getNextLot = () => {
    emitEvent('requestNextLot');
    console.log('Emitido requestNextLot');
  };

  const getLogo = () => {
    alert('Logo MVT');
  };

  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título */}
      <PageHeader title="Switcher" />
      <Suspense fallback={<Spinner />}>
        <SimpleGrid columns={3} spacing={4} mt={10}>
          <ButtonComponent onClick={getLastFiveResults}>
            Últimos 5 resultados
          </ButtonComponent>
          <ButtonComponent onClick={getNextLot}>Próximo sorteo</ButtonComponent>
          <ButtonComponent onClick={getLogo}>Logo MVT</ButtonComponent>
        </SimpleGrid>
      </Suspense>
    </Box>
  );
}
