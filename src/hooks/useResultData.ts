// hooks/useResultsData.js
import { useQuery } from 'react-query';
import { useGetMany } from '@/services/getManyService';
import catalogs from '@/utils/catalogs';

function useResultsData() {
  const { resultCatalog } = catalogs;
  const { getMany } = useGetMany();
  const { data, isLoading, error } = useQuery('resultsData', () =>
    getMany(resultCatalog, {
      includes: ['lot', 'participant'],
    }),
  );

  return { data, isLoading, error };
}

export default useResultsData;
