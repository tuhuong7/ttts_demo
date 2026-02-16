import api from './api';

const userService = {
    getAllUsers: async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await api.get(`/admin/users?${params}`);
        return response.data;
    },

    getUserById: async (id) => {
        const response = await api.get(`/admin/users/${id}`);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await api.get('/admin/users/me');
        return response.data;
    },

    createUser: async (userData) => {
        const response = await api.post('/admin/users', userData);
        return response.data;
    },

    updateUser: async (id, userData) => {
        const response = await api.put(`/admin/users/${id}`, userData);
        return response.data;
    },

    deleteUser: async (id) => {
        const response = await api.delete(`/admin/users/${id}`);
        return response.data;
    },

    lockUser: async (id) => {
        const response = await api.patch(`/admin/users/${id}/lock`);
        return response.data;
    },

    unlockUser: async (id) => {
        const response = await api.patch(`/admin/users/${id}/unlock`);
        return response.data;
    },

    changePassword: async (id, passwordData) => {
        const response = await api.patch(`/admin/users/${id}/change-password`, passwordData);
        return response.data;
    },

    assignRole: async (id, roleId) => {
        const response = await api.patch(`/admin/users/${id}/assign-role`, { role_id: roleId });
        return response.data;
    }
};

export default userService;
