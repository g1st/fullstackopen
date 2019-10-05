import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const apiKey = '2194657fee1480280a0fc1896dd8de47';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`;

    axios.get(url).then(res => {
      const { data } = res;
      const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      setWeather({
        temperature: data.main.temp.toFixed(),
        icon: weatherIcon,
        name: data.weather.main,
        wind: data.wind.speed
      });
    });
  }, []);
  return (
    <div>
      <h1>Weather in {capital}</h1>
      <div>Current temperature {weather.temperature}&#x2103;</div>
      <img src={weather.icon} alt={weather.name} />
      <div>
        <strong>wind:</strong> {weather.wind} km/h
      </div>
    </div>
  );
};

export default Weather;
