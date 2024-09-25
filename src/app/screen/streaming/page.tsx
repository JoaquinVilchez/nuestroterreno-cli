'use client';

import { Box } from '@chakra-ui/react';
import { useSocketContent } from '@/hooks/useSocketContent'; // Importa el hook
import PageHeader from '@/app/components/PageHeader';
import { isResultArray, isLot } from '@/utils/typeGuards';

export default function PrompterPage() {
  const content = useSocketContent('broadcast'); // Usa el hook para obtener el contenido específico para prompter

  const renderContent = () => {
    if (!content.data) {
      return null;
    }

    switch (content.type) {
      case 'lastResults':
        if (isResultArray(content.data)) {
          return (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>Últimos 5 resultados</p>
              {content.data.map((result) => (
                <Box key={result.id}>
                  <p>ID: {result.id}</p>
                </Box>
              ))}
            </Box>
          );
        }
        break;

      case 'fullInfo':
        if (content.data) {
          return (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>fullInfoData: {content.data}</p>
            </Box>
          );
        }
        break;

      case 'nextDraw':
        if (isLot(content.data)) {
          return (
            <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
              <p>Próximo Ganador: {content.data.denomination}</p>
            </Box>
          );
        }
        break;

      case 'defaultPage':
        return (
          <Box p={2} borderWidth={1} borderRadius="md" mb={2}>
            <p>LOGO</p>
          </Box>
        );

      default:
        return <p>Dato no reconocido</p>;
    }
  };

  return (
    <Box>
      <PageHeader title="Prompter" showButton={false} />
      <Box>{renderContent()}</Box>
    </Box>
  );
}
