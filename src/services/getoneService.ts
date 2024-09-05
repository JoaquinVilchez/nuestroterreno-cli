import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { apiLoadingState, apiErrorState } from '../atoms/apiState';
import apiClient from './apiClient';
import { DataType } from '@/types/dataType';

export const useGetOne = () => {
  const setLoading = useSetRecoilState(apiLoadingState);
  const setError = useSetRecoilState(apiErrorState);

  const getOne = useCallback(
    async (dataType: DataType, id: string | number) => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await apiClient.get(`/${dataType.endpoint}/${id}`);
        return data;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError], // Asegúrate de que estas dependencias no cambian
  );

  return { getOne };
};
