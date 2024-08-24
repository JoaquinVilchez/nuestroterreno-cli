'use client';

import { useParams } from 'next/navigation';
import { Box } from '@chakra-ui/react';
import PageHeader from '@/app/components/PageHeader';

export default function EditLotPage() {
  const { id } = useParams();

  return (
    <Box mt={8}>
      <PageHeader title={`Editar lote ${id}`} showButton={false} />
    </Box>
  );
}
