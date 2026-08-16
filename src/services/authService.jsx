import { axiosInstance } from "./axiosInstance.jsx";

  async function handleRequest(request) {
  try {
    const res = await request();
    return res.data;
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
}

export const authAPI = {
    getUser: async () => {
        return handleRequest(() =>
            axiosInstance.get(`/auth/me`));
    },
    login: async (data) => {
        return handleRequest(() =>
            axiosInstance.post(`/auth/login`, data));
    },
    register: async (data) => {
        return handleRequest(() =>
            axiosInstance.post(`/auth/register`, data));
    },
    refresh: async () => {
        return handleRequest(() =>
            axiosInstance.post(`/auth/refresh`));
    },
    logout: async () => {
        return handleRequest(() =>
            axiosInstance.post(`/auth/logout`));
    },
    forgotPassword: async (data) => {
        return handleRequest(() =>
            axiosInstance.post(`/auth/forgot-password`, data));
    },
    resetPassword: async (data) => {
        return handleRequest(() =>
            axiosInstance.post(`/auth/reset-password`, data));
    },
    updateProfile: async (data) => {
        return handleRequest(() =>
            axiosInstance.put(`/auth/profile`, data));
    },
}
