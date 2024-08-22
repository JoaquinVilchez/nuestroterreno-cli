import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Puedes usar variables de entorno para la URL base
  headers: {
    'Content-Type': 'application/json',
  },
});

console.log('Base URL:', process.env.NEXT_PUBLIC_API_URL);

export default apiClient;