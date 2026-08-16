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

export const carriersApi = {
    getAirlines: async () => {
        return handleRequest(() =>
            axiosInstance.get(`/airlines`));
    },
    getCompaniesByType: async(type) => {
                return handleRequest(() =>
            axiosInstance.get(`/companies?type=${type}`));
    }
}