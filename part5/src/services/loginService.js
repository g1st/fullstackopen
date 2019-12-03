import axios from 'axios';

const baseUrl = '/api/login';
const login = async config => {
  const response = await axios.post(baseUrl, config);
  return response.data;
};

export default { login };
