const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      const { blogs } = action.payload;
      return blogs;
    case 'ADD_BLOG':
      const { blog } = action.payload;
      return state.concat(blog);
    case 'ADD_COMMENT':
      const { blogId, comment } = action.payload;
      const newState = state.map(blog => {
        if (blog.id === blogId) {
          return { ...blog, comments: blog.comments.concat(comment) };
        }
        return blog;
      });
      return newState;
    case 'REMOVE_BLOG':
      const { id } = action.payload;
      return state.filter(blog => blog.id !== id);
    default:
      return state;
  }
};

export default blogReducer;
