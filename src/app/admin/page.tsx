'use client';

import { Box, Text } from '@chakra-ui/react';
import PageHeader from '../components/PageHeader';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const { data: session } = useSession();

  return (
    <Box>
      <PageHeader
        title="Escritorio"
        showButton={false}
        showBackButton={false}
      />
      {session ? (
        <div>
          <p>User Profile</p>
          <p>Name: {session?.user?.firstName}</p>
          <p>Email: {session?.user?.email}</p>
          <p>token: {session?.user?.accessToken}</p>
        </div>
      ) : (
        <Text fontSize="lg">No has iniciado sesión.</Text>
      )}
    </Box>
  );
}
