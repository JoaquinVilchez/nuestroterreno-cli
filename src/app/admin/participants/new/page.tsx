'use client';

import ParticipantForm from '@/app/components/forms/ParticipantForm';
import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';

export default function NewParticipantPage() {
  return (
    <Box>
      <PageHeader title="Nuevo participante" showButton={false} />
      <ParticipantForm />
    </Box>
  );
}
