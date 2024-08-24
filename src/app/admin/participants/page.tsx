'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function ParticipantsPage() {
  return (
    <Box>
      <Box>
        {/* Componente de encabezado de página que incluye el título */}
        <PageHeader
          title="Participantes"
          showButton={true}
          buttonText="Nuevo"
          href="/admin/participants/new"
        />
      </Box>
    </Box>
  );
}
