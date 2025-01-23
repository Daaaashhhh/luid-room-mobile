import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for your API
const BASE_URL =
  'https://xsdjvd3q20.execute-api.ap-southeast-1.amazonaws.com/prod/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('userToken'); // Changed from localStorage to AsyncStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Response interceptor for handling errors globally
api.interceptors.response.use(
  response => response.data,
  error => {
    // Handle errors globally here
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  },
);

// API methods
const apiService = {
  // Auth endpoints
  login: credentials => api.post('/auth/login', credentials),
  register: userData => api.post('/auth/register', userData),
  forgotPassword: email => api.post('/auth/forgot-password', {email}),

  // Profile endpoints
  getProfile: () => api.get('/users/profile'),
  updateProfile: data => api.put('/users/profile', data),

  // Design endpoints
  createDesign: designData => api.post('/designs', designData),
  getMyDesigns: () => api.get('/designs/my-designs'),
  getDesignById: id => api.get(`/designs/design/${id}`),
  updateDesign: (id, data) => api.put(`/designs/${id}`, data),
  toggleFavorite: (id, isFavorite) =>
    api.put(`/designs/design/${id}`, {isFavorite}),
  getFavorites: () => api.get('/designs/favorites'),
  deleteDesign: id => api.delete(`/designs/design/${id}`),

  // Image generation endpoints
  generateImage: async formData => {
    const response = await api.post(
      'http://52.221.196.146/api/designs/generate',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  },

  // Add more API methods as needed
};

export default apiService;
