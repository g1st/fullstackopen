import React from 'react';
import { connect } from 'react-redux';
import { filterFor, clearFilter } from '../reducers/filterReducer';

const Filter = ({ anecdotes, filterFor, clearFilter }) => {
  const handleChange = event => {
    const searchTerm = event.target.value;
    if (searchTerm) {
      filterFor(searchTerm, anecdotes);
    } else {
      clearFilter();
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

const mapStateToProps = state => ({
  anecdotes: state.anecdotes
});

const mapDispatchToProps = {
  filterFor,
  clearFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
