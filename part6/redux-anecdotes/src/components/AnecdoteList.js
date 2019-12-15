import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ store }) => {
  const vote = id => {
    store.dispatch(addVote(id));
  };

  const anecdotes = store.getState();
  return anecdotes
    .sort((el1, el2) => el1.votes < el2.votes)
    .map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
