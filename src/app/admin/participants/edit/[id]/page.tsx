'use client';

import { useParams } from 'next/navigation';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PageHeader from '@/app/components/PageHeader';
import ParticipantForm from '@/app/components/forms/ParticipantForm';
import catalogs from '@/utils/catalogs';
import { useRecoilValue } from 'recoil';
import { apiErrorState, apiLoadingState } from '@/atoms/apiState';
import { useGetOne } from '@/services/getoneService';

export default function EditParticipantPage() {
  const { id } = useParams();
  const participantId = Array.isArray(id) ? id[0] : id;
  const { participantCatalog } = catalogs;
  const { getOne } = useGetOne();
  const [participantData, setParticipantData] = useState(null);

  const loading = useRecoilValue(apiLoadingState);
  const error = useRecoilValue(apiErrorState);

  useEffect(() => {
    const fetchParticipant = async () => {
      const data = await getOne(participantCatalog, participantId);
      setParticipantData(data);
    };

    fetchParticipant();
  }, [getOne, participantCatalog, participantId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box mt={8}>
      <PageHeader
        title={`Editar participante`}
        showButton={false}
        goBackSteps={2}
      />
      {participantData && <ParticipantForm participantData={participantData} />}
    </Box>
  );
}
