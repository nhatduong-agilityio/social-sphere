// Axios.
import axios from 'axios';
import { URL } from '~/constant/urls';

// Create baseURL and headers default
const client = axios.create({
  baseURL: URL.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export { client };
