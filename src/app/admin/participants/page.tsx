'use client';

import { fetchParticipants } from '@/services/participants';
import { getFullName } from '@/utils/formatters';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

export default function ParticipantsPage() {
  const { data, error, isLoading } = useQuery(
    'participants',
    fetchParticipants,
  );

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error loading participants</Text>;

  return (
    <Box padding="4" bg="gray.100" maxW="3xl" mx="auto">
      <Heading as="h1" size="2xl" textAlign="center" mt="8">
        PARTICIPANTS PAGE
      </Heading>

      <Box>
        {data.map((participant: any) => (
          <Text key={participant.id}>
            {getFullName(
              participant.lastName,
              participant.secondLastName,
              participant.firstName,
            )}
          </Text>
        ))}
      </Box>
    </Box>
  );
}
