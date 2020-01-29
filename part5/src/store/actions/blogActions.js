import blogService from '../../services/blogService';
import axios from 'axios';

const baseUrl = 'api/blogs';

const addBlog = resource => {
  return async dispatch => {
    const response = await axios({
      method: 'post',
      url: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${resource.token}`
      },
      data: resource
    });
    const blog = response.data;
    return dispatch({
      type: 'ADD_BLOG',
      payload: { blog }
    });
  };
};

const removeBlog = id => ({
  type: 'REMOVE_BLOG',
  payload: { id }
});

const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAllBlogs();
    return dispatch({
      type: 'INITIALIZE_BLOGS',
      payload: {
        blogs
      }
    });
  };
};

export { addBlog, removeBlog, initializeBlogs };
