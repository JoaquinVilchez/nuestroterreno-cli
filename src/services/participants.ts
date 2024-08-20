// src/services/participants.ts
import apiClient from './apiClient';

export const fetchParticipants = async () => {
  const { data } = await apiClient.get('/participant');
  return data;
};
