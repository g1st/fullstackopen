import anecdotesService from '../services/anecdotes';

const reducer = (state = [], action) => {
  console.log('state now: ', state);
  console.log('action', action);

  switch (action.type) {
    case 'VOTE':
      const { id } = action.payload.anecdote;

      return state.map(anecdote => {
        if (anecdote.id === id) {
          return action.payload.anecdote;
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

export const addVote = content => {
  return async dispatch => {
    const anecdote = await anecdotesService.addVote(content);
    dispatch({
      type: 'VOTE',
      payload: {
        anecdote
      }
    });
  };
};

export const addAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdotesService.createNew(content);
    dispatch({
      type: 'ADD_ANECDOTE',
      payload: {
        ...anecdote
      }
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({ type: 'INIT_ANECDOTES', payload: anecdotes });
  };
};

export default reducer;
