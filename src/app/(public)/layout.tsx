'use client';

import { ReactNode } from 'react';
import { Box } from '@chakra-ui/react';

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Box as="main" p={4}>
      {children}
    </Box>
  );
}
