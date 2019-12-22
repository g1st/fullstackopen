import React from 'react';
import { filterFor, clearFilter } from '../reducers/filterReducer';

const Filter = ({ store }) => {
  const handleChange = event => {
    const searchTerm = event.target.value;
    const anecdotes = store.getState().anecdotes;
    if (searchTerm) {
      store.dispatch(filterFor(searchTerm, anecdotes));
    } else {
      store.dispatch(clearFilter());
    }
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
