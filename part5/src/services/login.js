import axios from "axios";

const loginUser = async config => {
  const url = "/api/login";
  const user = await axios.post(url, config);
  return user.data;
};

export { loginUser };
