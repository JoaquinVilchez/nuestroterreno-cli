'use client';

import PageHeader from '@/app/components/PageHeader';
import ResultForm from '@/app/components/forms/ResultForm';
import { Box, Flex, Text } from '@chakra-ui/react';

export default function DrawPage() {
  return (
    <Box>
      {/* Componente de encabezado de página que incluye el título */}
      <PageHeader title="Sortear" showButton={false} />
      <Flex
        width="100%"
        justify="center"
        align="center"
        flexDirection={['column', 'row']}
        gap={8}
      >
        <Box width={['100%', '70%']} p={4}>
          <ResultForm />
        </Box>
        <Box width={['100%', '30%']} p={4}>
          <Text>Ultimos 5 ganadores</Text>
        </Box>
      </Flex>
    </Box>
  );
}
