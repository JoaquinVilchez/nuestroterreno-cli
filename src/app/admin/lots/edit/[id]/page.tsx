'use client';

import { useParams } from 'next/navigation';
import { Box, Spinner, Text } from '@chakra-ui/react';
import PageHeader from '@/app/components/PageHeader';
import catalogs from '@/utils/catalogs';
import { useRecoilValue } from 'recoil';
import { apiErrorState, apiLoadingState } from '@/atoms/apiState';
import { useEffect, useState } from 'react';
import LotForm from '@/app/components/forms/LotForm';
import { useGetOne } from '@/services/getoneService';

export default function EditLotPage() {
  const { id } = useParams();
  const lotId = Array.isArray(id) ? id[0] : id;
  const { lotCatalog } = catalogs;
  const { getOne } = useGetOne();
  const [lotData, setLotData] = useState(null);

  const loading = useRecoilValue(apiLoadingState);
  const error = useRecoilValue(apiErrorState);

  useEffect(() => {
    const fetchLot = async () => {
      const data = await getOne(lotCatalog, lotId);
      setLotData(data);
    };

    fetchLot();
  }, [getOne, lotCatalog, lotId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box mt={8}>
      <PageHeader title={`Editar lote`} showButton={false} goBackSteps={2} />
      {lotData && <LotForm lotData={lotData} />}
    </Box>
  );
}
