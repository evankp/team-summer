import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// example interceptor for setting token - could also set token as default
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // Duplicate user or invalid email/password
    if (response.code === 409 || response.data['err'] === 'Invalid email/password') {
      return Promise.resolve({ data: response.data });
    }

    return Promise.reject(error);
  }
);

export default instance;
