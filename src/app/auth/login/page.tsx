'use client';

import LoginAuthForm from '@/app/components/forms/LoginAuthForm';
import {
  Center,
  Box,
  Image,
  VStack,
  SimpleGrid,
  Spacer,
} from '@chakra-ui/react';

export default function LoginPage() {
  return (
    <Center minH="100vh">
      <SimpleGrid columns={3} spacing={4}>
        <Spacer />
        <Box minW="xl">
          <VStack>
            <Image
              src="/logo_mvt.png"
              width={150}
              mb={10}
              alt="Logo Municipalidad de Venado Tuerto"
            />
            <LoginAuthForm />
          </VStack>
        </Box>
        <Spacer />
      </SimpleGrid>
    </Center>
  );
}
