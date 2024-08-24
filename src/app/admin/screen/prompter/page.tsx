'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function ScreenPrompterPage() {
  return (
    <Box>
      <Box>
        {/* Componente de encabezado de página que incluye el título */}
        <PageHeader title="Prompter" showButton={false} />
      </Box>
    </Box>
  );
}
