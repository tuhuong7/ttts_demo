import api from './api';


export const getFaculties = async (params = {}) => {
  const response = await api.get('/faculties', { params });
  return response.data;
};

export const getFacultyById = async (id) => {
  const response = await api.get(`/faculties/${id}`);
  return response.data;
};

export const getFacultyBySlug = async (slug) => {
  const response = await api.get(`/faculties/slug/${slug}`);
  return response.data;
};


export const getAllFaculties = async (params = {}) => {
  const response = await api.get('/admin/faculties', { params });
  return response.data;
};

export const createFaculty = async (data) => {
  const response = await api.post('/admin/faculties', data);
  return response.data;
};

export const updateFaculty = async (id, data) => {
  const response = await api.put(`/admin/faculties/${id}`, data);
  return response.data;
};

export const deleteFaculty = async (id) => {
  const response = await api.delete(`/admin/faculties/${id}`);
  return response.data;
};

export default {
  getFaculties,
  getFacultyById,
  getFacultyBySlug,
  getAllFaculties,
  createFaculty,
  updateFaculty,
  deleteFaculty
};
