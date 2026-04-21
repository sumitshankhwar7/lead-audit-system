import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// ✅ ADD THIS
export const submitAudit = async (data) => {
  const res = await api.post('/audit', data);
  return res.data;
};

export default api;
