const initialState = '';

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { content, type } = action.payload;
      let prefix;
      if (type === 'ANECDOTE') {
        prefix = 'you added ';
      } else {
        prefix = 'you voted ';
      }

      return `${prefix} '${content}'`;
    case 'REMOVE_NOTIFICATION':
      return '';

    default:
      return state;
  }
};

export const addNotification = (content, type) => ({
  type: 'SET_NOTIFICATION',
  payload: {
    content,
    type
  }
});

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  };
};

export default notificationReducer;
