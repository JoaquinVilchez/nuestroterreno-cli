'use client';

import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export default function ScreenLayout({ children }: { children: ReactNode }) {
  return (
    <Box display="flex" flexDirection="column" minH="100vh">
      {children}
    </Box>
  );
}
