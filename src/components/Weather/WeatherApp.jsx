import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  const [weatherIcon, setWeatherIcon] = useState(cloud_icon);
  const [weatherData, setWeatherData] = useState({
    humidity: '64%',
    windSpeed: '18 km/h',
    temperature: '24°C',
    location: 'London',
  });

  const api_key = '83a95b56e1fcf4080fc8d72343c88aeb';

  const search = async () => {
    const cityInput = document.querySelector('.cityInput');
    if (!cityInput.value) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=Metric&appid=${api_key}`;
      const response = await fetch(url);
      const data = await response.json();

      setWeatherData({
        humidity: `${data.main.humidity}%`,
        windSpeed: `${data.wind.speed} km/h`,
        temperature: `${data.main.temp} °C`,
        location: data.name,
      });

      switch (data.weather[0].icon) {
        case '01d':
        case '01n':
          setWeatherIcon(clear_icon);
          break;
        case '02d':
        case '02n':
          setWeatherIcon(cloud_icon);
          break;
        case '03d':
        case '03n':
        case '04d':
        case '04n':
          setWeatherIcon(drizzle_icon);
          break;
        case '09d':
        case '09n':
        case '10d':
        case '10n':
          setWeatherIcon(rain_icon);
          break;
        case '13d':
        case '13n':
          setWeatherIcon(snow_icon);
          break;
        default:
          setWeatherIcon(clear_icon);
          break;
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Search' />
        <div className='search-icon' onClick={search}>
          <img src={search_icon} alt='Search' />
        </div>
      </div>
      <div className='weather-image'>
        <img src={weatherIcon} alt='Weather' />
      </div>
      <div className='weather-temp'>{weatherData.temperature}</div>
      <div className='weather-location'>{weatherData.location}</div>
      <div className='data-container'>
        <div className='element'>
          <img src={humidity_icon} alt='Humidity' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{weatherData.humidity}</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src={wind_icon} alt='Wind' className='icon' />
          <div className='data'>
            <div className='wind-rate'>{weatherData.windSpeed}</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
