export const setNotification = (content, type, timerId) => {
  return dispatch => {
    clearTimeout(timerId);
    const id = setTimeout(() => {
      return dispatch({
        type: 'REMOVE_NOTIFICATION'
      });
    }, 5000);
    return dispatch({
      type: 'SET_NOTIFICATION',
      payload: {
        content,
        type,
        id
      }
    });
  };
};

export const removeNotification = () => ({
  type: 'REMOVE_NOTIFICATION'
});
