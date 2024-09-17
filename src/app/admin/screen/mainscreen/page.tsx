'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box, Heading } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent';
import { isLot, isResultArray } from '@/utils/typeGuards';

export default function ScreenMainScreenPage() {
  const content = useSocketContent('mainScreen'); // Específica para mainScreen

  const renderContent = () => {
    if (!content.data) {
      return null;
    }

    if (content.type === 'lastResults' && isResultArray(content.data)) {
      return content.data.map((result) => (
        <Box key={result.id} p={2} borderWidth={1} borderRadius="md" mb={2}>
          <p>ID: {result.id}</p>
        </Box>
      ));
    }

    if (content.type === 'nextLot' && isLot(content.data)) {
      return (
        <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
          <p>Ganador: {content.data.denomination}</p>
        </Box>
      );
    }

    if (content.type === 'defaultPage') {
      return <Heading>LOGO!!</Heading>;
    }

    return null; // En caso de no coincidir ningún tipo
  };

  return (
    <Box>
      <PageHeader title="Pantalla Principal" showButton={false} />
      <Box mt={5}>{renderContent()}</Box>
    </Box>
  );
}
