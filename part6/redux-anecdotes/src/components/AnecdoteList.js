import React from 'react';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = ({ store }) => {
  const vote = id => {
    store.dispatch(addVote(id));
  };

  const anecdotes = store.getState().anecdotes.sort((el1, el2) => {
    if (el1.votes <= el2.votes) return 1;
    return -1;
  });
  return anecdotes.map(anecdote => (
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
