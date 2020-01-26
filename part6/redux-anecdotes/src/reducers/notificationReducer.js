const initialState = {
  content: '',
  id: null
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      const { content, id } = action.payload;
      return { content, id };
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

export const setNotification = (content, seconds, timerId) => {
  return dispatch => {
    clearTimeout(timerId);
    const id = setTimeout(() => {
      return dispatch({
        type: 'REMOVE_NOTIFICATION'
      });
    }, seconds * 1000);
    return dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        content,
        id
      }
    });
  };
};

export default notificationReducer;
