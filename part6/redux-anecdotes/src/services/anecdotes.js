import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await fetch(baseUrl);
  const data = response.json();
  return data;
};

const createNew = async content => {
  const object = { content, votes: 0, important: false };

  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(object)
  });
  const data = await response.json();
  return data;
};

const addVote = async anecdote => {
  anecdote.votes += 1;
  const response = await fetch(baseUrl + `/${anecdote.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(anecdote)
  });
  const data = await response.json();
  return data;
};

export default { getAll, createNew, addVote };
