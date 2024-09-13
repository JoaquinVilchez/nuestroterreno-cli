import { useSetRecoilState } from 'recoil';
import { apiLoadingState, apiErrorState } from '../atoms/apiState';
import apiClient from './apiClient';
import useCustomToast from '@/app/components/Toast';
import { DataType } from '@/types/dataType';
import { ResultType } from '@/types/resultType';
import { DrawType } from '@/types/drawType';

interface getManyOptions {
  includes?: string[];
  quantity?: number;
  orderBy?: 'ASC' | 'DESC';
  drawType?: DrawType;
  resultType?: ResultType;
  group?: number;
  forSelect?: boolean;
}

// Hook personalizado
export const useGetMany = () => {
  const setLoading = useSetRecoilState(apiLoadingState);
  const setError = useSetRecoilState(apiErrorState);
  const showToast = useCustomToast();

  const getMany = async (dataType: DataType, options: getManyOptions = {}) => {
    setLoading(true);
    setError(null);

    const {
      includes = [],
      quantity,
      orderBy,
      drawType,
      resultType,
      group,
      forSelect,
    } = options;
    const params = new URLSearchParams();

    if (includes.length > 0) params.append('includes', includes.join(','));
    if (quantity !== undefined) params.append('quantity', quantity.toString());
    if (orderBy) params.append('orderBy', orderBy);
    if (drawType) params.append('drawType', drawType);
    if (resultType) params.append('resultType', resultType);
    if (group) params.append('group', group.toString());
    if (forSelect) params.append('forSelect', forSelect.toString());

    const url = params.toString()
      ? `/${dataType.endpoint}?${params.toString()}`
      : `/${dataType.endpoint}`;

    try {
      const { data } = await apiClient.get(url);
      return data;
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

  return { getMany };
};
