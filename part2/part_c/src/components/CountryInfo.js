import React from 'react';

import Weather from './Weather';

const CountryInfo = ({ country }) => {
  return (
    <div key={country.name}>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(el => (
          <li key={el.name}>{el.name}</li>
        ))}
      </ul>
      <img
        src={country.flag}
        alt={`${country.name} flag`}
        style={{ maxWidth: '100px' }}
      />
      <Weather capital={country.capital} />
    </div>
  );
};

export default CountryInfo;
