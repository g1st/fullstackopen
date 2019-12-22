const filterReducer = (state = {}, action) => {
  switch (action.type) {
    case 'APPLY_FILTER': {
      const { searchTerm, anecdotes } = action.payload;
      const filteredAnecdotes = anecdotes.filter(({ content }) =>
        content.includes(searchTerm)
      );
      return { anecdotes: filteredAnecdotes, active: true };
    }
    case 'CLEAR_FILTER': {
      return { anecdotes: [], active: false };
    }
    default:
      return state;
  }
};

export const filterFor = (searchTerm, anecdotes) => ({
  type: 'APPLY_FILTER',
  payload: { searchTerm, anecdotes }
});

export const clearFilter = () => ({
  type: 'CLEAR_FILTER'
});

export default filterReducer;
