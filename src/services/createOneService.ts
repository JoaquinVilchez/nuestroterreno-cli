import { useSetRecoilState } from 'recoil';
import { apiLoadingState, apiErrorState } from '../atoms/apiState';
import apiClient from './apiClient';
import useCustomToast from '@/app/components/Toast';
import { DataType } from '@/types/dataType';
import { capitalizeFirstLetter } from '@/utils/formatters';
import { useQueryClient } from 'react-query';

export const useCreateOne = () => {
  const queryClient = useQueryClient();
  const setLoading = useSetRecoilState(apiLoadingState);
  const setError = useSetRecoilState(apiErrorState);
  const showToast = useCustomToast();

  const createOne = async (dataType: DataType, data: Record<string, any>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post(`/${dataType.endpoint}`, data, {
        withCredentials: true,
      });

      queryClient.invalidateQueries(dataType.key);

      showToast({
        title: `${capitalizeFirstLetter(dataType.label)} creado`,
        description: `El ${dataType.label} ha sido creado exitosamente.`,
        status: 'success',
      });
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message;

      setError(errorMessage);

      showToast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
      });

      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createOne };
};
