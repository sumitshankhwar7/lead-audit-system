import api from './api';

export const submitAudit = async (data) => {
  const response = await api.post('/audit', data);
  return response.data;
};
