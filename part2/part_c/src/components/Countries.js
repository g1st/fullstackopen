import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data));
  }, []);

  const handleSearch = event => {
    setCountry(event.target.value);
    personsData();
  };

  const personsData = () => {
    const regExp = new RegExp(country, 'i');

    const countriesToDisplay = countries.filter(country =>
      country.name.match(regExp)
    );

    if (countriesToDisplay.length === 1) {
      return countriesToDisplay.map(country => (
        <div>
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
        </div>
      ));
    }
    if (countriesToDisplay.length <= 10) {
      return (
        <div>
          {countriesToDisplay.map(country => (
            <div>{country.name} </div>
          ))}
        </div>
      );
    }
    return <div>Too many matches, specify another filter</div>;
  };

  return (
    <div>
      <h1>countries</h1>
      <div>
        typa a country{' '}
        <input type="text" value={country} onChange={handleSearch} />
      </div>
      <div>{personsData()}</div>
    </div>
  );
};

export default Countries;
