import axios from "axios";

const baseUrl = "/api/blogs";
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
    method: "post",
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    data
  });
  return request.then(response => response.data);
};

export { getAll, postNewBlog, setToken };
