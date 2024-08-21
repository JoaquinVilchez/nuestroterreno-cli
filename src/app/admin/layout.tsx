'use client';

import { ReactNode } from 'react';
import { Box, Container } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      <Navbar />
      <Container maxW="6xl" flex="1" py={4}>
        {children}
      </Container>
      <Footer />
    </Box>
  );
}
