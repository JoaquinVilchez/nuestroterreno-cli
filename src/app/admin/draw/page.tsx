'use client';

import DrawProgress from '@/app/components/DrawProgress';
import PageHeader from '@/app/components/PageHeader';
import ResultForm from '@/app/components/forms/ResultForm';
import { getNextDraw } from '@/services/getNextDraw';
import { getResultsCount } from '@/services/getResultsCount';
import { NextDrawType } from '@/types/nextDraw';
import { NumberOfDrawsCatalog } from '@/utils/catalogs';
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from 'react-query';

export default function DrawPage() {
  const {
    data: nextDrawData,
    isLoading,
    isError,
    error,
  } = useQuery<NextDrawType>({
    queryKey: ['nextDraw'],
    queryFn: getNextDraw,
  });

  const { data: drawed } = useQuery({
    queryKey: ['resultsCount'],
    queryFn: getResultsCount,
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    let errorMessage = 'Ocurrió un error desconocido';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título */}
      <PageHeader title="Sortear" showButton={false} />
      <Flex
        width="100%"
        justify="center"
        align="center"
        flexDirection="column"
        gap={0}
      >
        {/* Formulario del sorteo */}
        <Box width="100%" p={4}>
          <ResultForm nextDraw={nextDrawData} />
        </Box>

        {/* Componente de desarrollo del sorteo */}
        <Box width="100%" p={4}>
          <DrawProgress
            draws={NumberOfDrawsCatalog} // Pasamos el catálogo de sorteos
            drawed={drawed ?? 0} // Si drawed es undefined, usamos 0
          />
        </Box>
      </Flex>
    </Box>
  );
}
