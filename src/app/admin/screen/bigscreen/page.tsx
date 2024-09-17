'use client';

import PageHeader from '@/app/components/PageHeader';
import { Box } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent'; // Importa el hook
import { isLot, isResultArray } from '@/utils/typeGuards';

export default function ScreenBigScreenPage() {
  const content = useSocketContent('mainScreen'); // Específica para prompter

  return (
    <Box>
      <PageHeader title="Pantalla principal" showButton={false} />
      {content.data && (
        <Box mt={5}>
          {content.type === 'lastResults' &&
            isResultArray(content.data) &&
            content.data.map((result) => (
              <Box
                key={result.id}
                p={2}
                borderWidth={1}
                borderRadius="md"
                mb={2}
              >
                <p>ID: {result.id}</p>
              </Box>
            ))}
          {content.type === 'nextLot' && isLot(content.data) && (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>Ganador: {content.data.denomination}</p>
            </Box>
          )}
          {content.type === 'defaultPage' && (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>LOGO</p>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
