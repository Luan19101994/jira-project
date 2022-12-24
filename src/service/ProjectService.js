import axios from '../lib/axios';

export const getAllProject = (params) => axios.get('https://jiranew.cybersoft.edu.vn/api/Project/getAllProject', { params }).then((_) => _.data);
export const getDetail = (id) => axios.get(`https://jiranew.cybersoft.edu.vn/api/Project/getProjectDetail?id=${id}`).then((_) => _.data);
export const deleteProject = (id) => axios.delete(`https://jiranew.cybersoft.edu.vn/api/Project/deleteProject?projectId=${id}`).then((_) => _.content);
export const createProject = (data) => axios.post(`https://jiranew.cybersoft.edu.vn/api/Project/createProjectAuthorize` , data).then((_) => _.content);
export const updateProject = (id, data) => axios.put(`https://jiranew.cybersoft.edu.vn/api/Project/updateProject?projectId=${id}` , data).then((_) => _.content);
export const assignUserProject = (data) => axios.post(`https://jiranew.cybersoft.edu.vn/api/Project/assignUserProject` , data).then((_) => _.content);
export const removeUserFromProject = (data) => axios.post(`https://jiranew.cybersoft.edu.vn/api/Project/removeUserFromProject` , data).then((_) => _.content);