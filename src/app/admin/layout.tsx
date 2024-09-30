'use client';

import { ReactNode } from 'react';
import {
  Box,
  ChakraProvider,
  ColorModeScript,
  Container,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import theme from '@/theme/adminTheme';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Navbar />
        <Container maxW="6xl" flex="1" py={4}>
          {children}
        </Container>
        <Footer />
      </ChakraProvider>
    </Box>
  );
}
