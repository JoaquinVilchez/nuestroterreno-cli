import apiClient from './apiClient';

export const getNextDraw = async () => {
  try {
    const { data } = await apiClient.get(`/result/next-draw`);
    return data;
  } catch (err) {
    throw err;
  }
};
