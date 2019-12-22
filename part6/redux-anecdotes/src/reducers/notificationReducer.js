const initialState = ['notification1', 'notification2', 'notification3'];

const reducer = (state = initialState, action) => {
  console.log('initial notificationReducer state:', state);
  switch (action.type) {
    case 'VOTE':
      const { id } = action.payload;

      return state.map(anecdote => {
        if (anecdote.id === id) {
          anecdote.votes++;
        }
        return anecdote;
      });
    case 'ADD_ANECDOTE':
      return [...state, action.payload];

    default:
      return state;
  }
};

export const addVote = id => {
  return {
    type: 'VOTE',
    payload: {
      id
    }
  };
};

export const addAnecdote = content => {
  return {
    type: 'ADD_ANECDOTE',
    payload: {}
  };
};

export default reducer;
