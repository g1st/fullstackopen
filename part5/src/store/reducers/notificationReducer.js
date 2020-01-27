const initialState = { content: '', type: '', id: null };

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { content, type, id } = action.payload;
      return { content, type, id };
    case 'REMOVE_NOTIFICATION':
      return { content: '', type: '', id: null };
    default:
      return state;
  }
};

export default notificationReducer;
