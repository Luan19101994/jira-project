import axios from '../lib/axios';

export const getTaskType = (params) => axios.get('https://jiranew.cybersoft.edu.vn/api/TaskType/getAll', { params }).then((_) => _.data);
export const getPriority = (params) => axios.get('https://jiranew.cybersoft.edu.vn/api/Priority/getAll', { params }).then((_) => _.data);
export const getStatus = (params) => axios.get('https://jiranew.cybersoft.edu.vn/api/Status/getAll', { params }).then((_) => _.data);
export const getTaskDetail = (taskId) => axios.get(`https://jiranew.cybersoft.edu.vn/api/Project/getTaskDetail?taskId=${taskId}`).then((_) => _.data);
export const createTask = (data) => axios.post(`https://jiranew.cybersoft.edu.vn/api/Project/createTask`, data).then((_) => _.data);
export const updateStatus = (data) => axios.put(`https://jiranew.cybersoft.edu.vn/api/Project/updateStatus`, data).then((_) => _.data);

