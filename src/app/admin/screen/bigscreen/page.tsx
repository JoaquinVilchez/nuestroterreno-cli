'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function ScreenBigScreenPage() {
  return (
    <Box>
      <Box>
        {/* Componente de encabezado de página que incluye el título */}
        <PageHeader title="Pantalla principal" showButton={false} />
      </Box>
    </Box>
  );
}
