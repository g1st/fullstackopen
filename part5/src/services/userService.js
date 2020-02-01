import axios from 'axios';

const baseUrl = '/api/users';

const getAllUsers = () => {
  const request = axios(baseUrl);
  return request.then(response => response.data);
};

const getUser = id => {
  const request = axios(baseUrl + '/' + id);
  return request.then(response => response.data);
};

export default { getAllUsers, getUser };
