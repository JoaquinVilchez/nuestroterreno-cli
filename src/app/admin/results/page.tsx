'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function ResultsPage() {
  return (
    <Box>
      <Box>
        {/* Componente de encabezado de página que incluye el título */}
        <PageHeader title="Resultados" showButton={false} />
      </Box>
    </Box>
  );
}
