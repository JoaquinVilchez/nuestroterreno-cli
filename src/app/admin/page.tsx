'use client';

import { Box } from '@chakra-ui/react';
import PageHeader from '../components/PageHeader';

export default function AdminPage() {
  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título */}
      <PageHeader
        title="Escritorio"
        showButton={false}
        showBackButton={false}
      />
    </Box>
  );
}
