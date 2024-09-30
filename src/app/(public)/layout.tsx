'use client';

import { ReactNode } from 'react';
import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from '@/theme/landingPageTheme';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Box display="flex" flexDirection="column" minH="100vh">
          {children}
        </Box>
      </ChakraProvider>
    </Box>
  );
}
