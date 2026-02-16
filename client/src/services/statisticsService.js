import api from './api';

const statisticsService = {
    getDashboardStats: async () => {
        const response = await api.get('/admin/stats/dashboard');
        return response.data;
    },

    getApplicationStats: async () => {
        const response = await api.get('/admin/stats/applications');
        return response.data;
    },

    getMajorStats: async () => {
        const response = await api.get('/admin/stats/majors');
        return response.data;
    }
};

export default statisticsService;
