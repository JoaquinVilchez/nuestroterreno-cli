'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function LotsPage() {
  return (
    <Box mt={8}>
      <PageHeader
        title="Lotes"
        showButton={true}
        buttonText="Nuevo"
        href="/admin/lots/new"
      />
    </Box>
  );
}
