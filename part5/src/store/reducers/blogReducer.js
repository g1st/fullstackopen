const initialState = [];

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INITIALIZE_BLOGS':
      const { blogs } = action.payload;
      return blogs;
    case 'ADD_BLOG':
      const { blog } = action.payload;
      return state.concat(blog);
    case 'REMOVE_BLOG':
      const { id } = action.payload;
      return state.filter(blog => blog.id !== id);
    default:
      return state;
  }
};

export default blogReducer;
