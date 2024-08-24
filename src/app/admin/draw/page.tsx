'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function DrawPage() {
  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título */}
      <PageHeader title="Sortear" showButton={false} />
    </Box>
  );
}
