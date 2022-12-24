import axios from '../lib/axios';

export const getAllCategory = (params) => axios.get('https://jiranew.cybersoft.edu.vn/api/ProjectCategory', { params }).then((_) => _.data);
