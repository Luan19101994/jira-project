import axios from '../lib/axios';

export const getAllUser = (params) => axios.get('https://jiranew.cybersoft.edu.vn/api/Users/getUser', { params }).then((_) => _.data);
export const deleteUser = (id) => axios.delete(`https://jiranew.cybersoft.edu.vn/api/Users/deleteUser?id=${id}`);
