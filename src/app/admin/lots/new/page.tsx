'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function NewLotPage() {
  return (
    <Box mt={8}>
      <PageHeader title="Nuevo lote" showButton={false} />
    </Box>
  );
}
