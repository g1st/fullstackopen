const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

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
    case 'INIT_ANECDOTES':
      return action.payload;
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
    payload: {
      ...content
    }
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    payload: anecdotes
  };
};

export default reducer;
