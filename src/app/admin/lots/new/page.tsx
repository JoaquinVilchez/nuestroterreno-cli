'use client';

import LotForm from '@/app/components/forms/LotForm';
import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function NewLotPage() {
  return (
    <Box>
      <PageHeader title="Nuevo lote" showButton={false} />
      <LotForm />
    </Box>
  );
}
