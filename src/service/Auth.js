import axios from '../lib/axios';

export const login = (params) => axios.post('https://jiranew.cybersoft.edu.vn/api/Users/signin', params).then((_) => _.data);
export const signUp = (params) => axios.post('https://jiranew.cybersoft.edu.vn/api/Users/signup', params).then((_) => _.data);
