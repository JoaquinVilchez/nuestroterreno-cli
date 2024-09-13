import { useSetRecoilState } from 'recoil';
import { apiLoadingState, apiErrorState } from '../atoms/apiState';
import apiClient from './apiClient';
import useCustomToast from '@/app/components/Toast';
import { DataType } from '@/types/dataType';
import { capitalizeFirstLetter } from '@/utils/formatters';
import { useQueryClient } from 'react-query';

// Hook personalizado para eliminar una entidad
export const useDeleteOne = () => {
  const queryClient = useQueryClient(); // Para acceder al queryClient
  const setLoading = useSetRecoilState(apiLoadingState);
  const setError = useSetRecoilState(apiErrorState);
  const showToast = useCustomToast();

  const deleteOne = async (dataType: DataType, id: string | number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.delete(`/${dataType.endpoint}/${id}`, {
        withCredentials: true,
      });

      queryClient.invalidateQueries(dataType.key);

      showToast({
        title: `${capitalizeFirstLetter(dataType.label)} eliminado`,
        description: `El ${dataType.label} ha sido eliminado exitosamente.`,
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

  return { deleteOne };
};
