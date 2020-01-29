import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const sendLike = (id, likes) => {
  const request = axios({
    method: 'patch',
    url: `${baseUrl}/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    data: {
      likes: likes + 1
    }
  });
  return request.then(response => response.data);
};

const removeBlog = id => {
  const request = axios({
    method: 'delete',
    url: `${baseUrl}/${id}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    }
  });
  return request.then(response => response.status);
};

const getAllBlogs = () => {
  const request = axios(baseUrl);
  return request.then(response => response.data);
};

export default { getAllBlogs, setToken, sendLike, removeBlog };
