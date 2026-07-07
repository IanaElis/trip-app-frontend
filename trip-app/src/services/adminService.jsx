import { axiosInstance } from "./axiosInstance";

export const adminApi = {
    getUsers: async () => {
        const res = await axiosInstance.get("/admin/users");
        return res.data;
    },

   blockUser: async (id) => {
        const res = await axiosInstance.put(`/admin/users/${id}/block`);
        return res.data;
    },

    unblockUser: async (id) => {
        const res = await axiosInstance.put(`/admin/users/${id}/unblock`);
        return res.data;
    }
};