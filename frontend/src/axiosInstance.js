import axios from 'axios';


const base_URl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:8000/api/v1/';

const axiosInstance = axios.create({
  baseURL: base_URl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to add Authorization header

axiosInstance.interceptors.request.use(
  (config) => {
    const access_Token = localStorage.getItem('access_token');
    if (access_Token) {
      config.headers['Authorization'] = `Bearer ${access_Token}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//Response Interceptor to handle token refresh

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refresh_Token = localStorage.getItem('refresh_token');
                if (refresh_Token) {
                    const response = await axios.post(`${base_URl}token/refresh/`, { refresh: refresh_Token }); 
                    const new_Access_Token = response.data.access;
                    localStorage.setItem('access_token', new_Access_Token);
                    originalRequest.headers['Authorization'] = `Bearer ${new_Access_Token}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;