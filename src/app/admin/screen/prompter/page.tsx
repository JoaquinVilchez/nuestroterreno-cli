'use client';

import { Box } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent'; // Importa el hook
import PageHeader from '@/app/components/PageHeader';

export default function PrompterPage() {
  const content = useSocketContent('prompter'); // Usa el hook para obtener el contenido

  return (
    <Box>
      <PageHeader title="Prompter" showButton={false} />
      {content.data && (
        <Box mt={5}>
          {content.type === 'lastResults' && (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>Últimos 5 resultados</p>
              {content.data.map((result: any) => (
                <Box key={result.id}>
                  <p>{result.id}</p>
                </Box>
              ))}
            </Box>
          )}
          {content.type === 'nextLot' && (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>Próximo Ganador: {content.data.firstName}</p>
            </Box>
          )}
          {content.type === 'defaultPage' && (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>{content.data}</p>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
