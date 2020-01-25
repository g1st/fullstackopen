import fetch from 'node-fetch';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await fetch(baseUrl);
  const data = response.json();
  return data;
};

const createNew = async content => {
  const object = { content, important: false };
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: object
  });
  const data = response.json();
  return data;
};

export default { getAll, createNew };
