'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Desactiva la recarga automática cuando la ventana recupera el foco
      retry: 1, // Reintenta una vez en caso de error
      staleTime: 1000 * 60 * 5, // Mantiene los datos frescos durante 5 minutos
    },
  },
});

const Providers = ({ children }: { children: ReactNode }) => (
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>{children}</ChakraProvider>
    </QueryClientProvider>
  </RecoilRoot>
);

export default Providers;
