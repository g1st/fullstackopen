import axios from 'axios';

const baseUrl = '/api/blogs';
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const postNewBlog = data => {
  const request = axios({
    method: 'post',
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    data
  });
  return request.then(response => response.data);
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

export { getAll, postNewBlog, setToken, sendLike, removeBlog };