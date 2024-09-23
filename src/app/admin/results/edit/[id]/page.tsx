'use client';

import { useParams } from 'next/navigation';
import { Box, Spinner, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import PageHeader from '@/app/components/PageHeader';
import ResultForm from '@/app/components/forms/ResultForm';
import catalogs from '@/utils/catalogs';
import { useGetOne } from '@/services/getOneService';
import { useRecoilValue } from 'recoil';
import { apiErrorState, apiLoadingState } from '@/atoms/apiState';

export default function EditResultPage() {
  const { id } = useParams();
  const resultId = Array.isArray(id) ? id[0] : id;
  const { resultCatalog } = catalogs;
  const { getOne } = useGetOne();
  const [resultData, setResultData] = useState(null);

  const loading = useRecoilValue(apiLoadingState);
  const error = useRecoilValue(apiErrorState);

  useEffect(() => {
    const fetchResult = async () => {
      const data = await getOne(resultCatalog, resultId);
      setResultData(data);
    };

    fetchResult();
  }, [getOne, resultCatalog, resultId]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text color="red.500">Error: {error}</Text>;
  }

  return (
    <Box mt={8}>
      <PageHeader
        title={`Editar resultado`}
        showButton={false}
        goBackSteps={2}
      />
      {resultData}
      {resultData && <ResultForm resultData={resultData} />}
    </Box>
  );
}
