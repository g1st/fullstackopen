const initialState = {
  content: '',
  id: null
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { content, type, id } = action.payload;
      let prefix;
      if (type === 'ANECDOTE') {
        prefix = 'you added ';
      }
      if (type === 'VOTE') {
        prefix = 'you voted ';
      }

      return { content: `${prefix} '${content}'`, id };
    case 'REMOVE_NOTIFICATION':
      return { content: '', id: null };

    default:
      return state;
  }
};

export const addNotification = (content, type, id) => ({
  type: 'SET_NOTIFICATION',
  payload: {
    content,
    type,
    id
  }
});

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  };
};

export default notificationReducer;
