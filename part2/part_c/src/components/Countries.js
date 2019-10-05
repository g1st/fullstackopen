import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CountryInfo from './CountryInfo';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => setCountries(res.data));
  }, []);

  const handleSearch = event => {
    setCountry(event.target.value);
    countriesData();
  };

  const showCountryHandler = country => () => {
    setShowCountry({ ...showCountry, [country]: !showCountry[country] });
  };

  const countriesData = () => {
    const regExp = new RegExp(country, 'i');

    const countriesToDisplay = countries.filter(country =>
      country.name.match(regExp)
    );

    if (countriesToDisplay.length === 1) {
      return countriesToDisplay.map(country => (
        <CountryInfo key={country.name} country={country} />
      ));
    }
    if (countriesToDisplay.length <= 10) {
      return (
        <div>
          {countriesToDisplay.map(country => (
            <div key={country.name}>
              {country.name}{' '}
              <button onClick={showCountryHandler(country.name)}>
                {showCountry[country.name] ? 'hide' : 'show'}
              </button>
              {showCountry[country.name] ? (
                <CountryInfo
                  key={country.name}
                  country={
                    countries.filter(obj => obj.name === country.name)[0]
                  }
                />
              ) : null}
            </div>
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
      <div>{countriesData()}</div>
    </div>
  );
};

export default Countries;
