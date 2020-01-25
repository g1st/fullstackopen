import React from 'react';
import { connect } from 'react-redux';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';
import Filter from './components/Filter';
import anecdoteService from './services/anecdotes';
import { initializeAnecdotes } from './reducers/anecdoteReducer';

const App = ({ store, initializeAnecdotes }) => {
  React.useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
      console.log(anecdotes);
      return initializeAnecdotes(anecdotes);
    });
  }, []);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default connect(null, { initializeAnecdotes })(App);
