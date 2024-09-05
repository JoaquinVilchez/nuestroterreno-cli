import { useSetRecoilState } from 'recoil';
import { apiLoadingState, apiErrorState } from '../atoms/apiState';
import apiClient from './apiClient';
import useCustomToast from '@/app/components/Toast';
import { DataType } from '@/types/dataType';
import { capitalizeFirstLetter } from '@/utils/formatters';
import { useQueryClient } from 'react-query';

export const useEditOne = () => {
  const queryClient = useQueryClient(); // Para acceder al queryClient
  const setLoading = useSetRecoilState(apiLoadingState);
  const setError = useSetRecoilState(apiErrorState);
  const showToast = useCustomToast();

  const editOne = async (
    dataType: DataType,
    id: string | number,
    data: Record<string, any>,
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.put(`/${dataType.endpoint}/${id}`, data);

      queryClient.invalidateQueries(dataType.key);

      showToast({
        title: `${capitalizeFirstLetter(dataType.label)} creado`,
        description: `El ${dataType.label} ha sido editado exitosamente.`,
        status: 'success',
      });
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      showToast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Unknown error',
        status: 'error',
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { editOne };
};
