import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: { 
        'Content-Type': 'application/json'
     },
     withCredentials: true
  });


let isRefreshing = false;
let failedQueue = [];

function processQueue(error) {
    failedQueue.forEach(promise => {
        if (error)
            promise.reject(error);
        else
            promise.resolve();
    });
    failedQueue = [];
}



export function setupAxiosInterceptors(onLogout) {

    axiosInstance.interceptors.response.use(
        response => response,
        async error => {
            const originalRequest = error.config;

            if ( error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

            if (
                originalRequest.url.includes("/auth/login") ||
                originalRequest.url.includes("/auth/register") ||
                originalRequest.url.includes("/auth/refresh")
            ) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({
                        resolve: () => resolve(axiosInstance(originalRequest)),
                        reject
                    });
                });
            }

            isRefreshing = true;

            try {
                await axiosInstance.post("/auth/refresh");
                console.log("HIT refresh");
                processQueue();
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError);
                onLogout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
    );
}