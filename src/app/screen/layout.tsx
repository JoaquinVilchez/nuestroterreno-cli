'use client';

import { ReactNode } from 'react';
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '@/theme/adminTheme';

export default function ScreenLayout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </Box>
  );
}
