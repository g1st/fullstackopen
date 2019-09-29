import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;

  return (
    <div>
      <h1>statistics</h1>
      {total > 0 ? (
        <table>
          <tbody>
            <Statistic value={good} text={'good'} />
            <Statistic value={neutral} text={'neutral'} />
            <Statistic value={bad} text={'bad'} />
            <Total total={total} />
            <Average good={good} bad={bad} total={total} />
            <Positive good={good} bad={bad} total={total} />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const Statistic = ({ value, text }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Total = ({ total }) => (
  <tr>
    <td>all</td>
    <td>{total}</td>
  </tr>
);
const Average = ({ good, total, bad }) => (
  <tr>
    <td>average</td>
    <td>{(good - bad) / total}</td>
  </tr>
);
const Positive = ({ good, total }) => (
  <tr>
    <td>positive</td>
    <td>{(good / total) * 100} %</td>
  </tr>
);

const Anecdotes = ({ anecdotes }) => {
  const [anecdote, setAnecdote] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getRandomNumberUpTo = num => Math.floor(Math.random() * num);

  const handleClick = () => {
    const randomNum = getRandomNumberUpTo(anecdotes.length);
    setAnecdote(randomNum);
  };

  const handleVote = () => {
    const copy = [...votes];
    copy[anecdote] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>anecdote of the day</h1>
      <p>{anecdotes[anecdote]}</p>
      <p>has {votes[anecdote]}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
      <h1>anecdote with most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>has {Math.max(...votes)} votes</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ];

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={'good'} />
      <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      <Statistics good={good} bad={bad} neutral={neutral} />
      <Anecdotes anecdotes={anecdotes} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
