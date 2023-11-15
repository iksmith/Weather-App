import React, { useState } from 'react'
import './App.css'

function App() {

  const apiKey = '9bfd83126f79634c04697dd5fe830e5b'
  const [weatherData, setWeatherData] = useState([{}])
  const [city, setCity] = useState('')
  const getWeather = (event) => {
    if (event.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`).then
      (response => response.json()).then
      (data => {
        setWeatherData(data)
        setCity('')
      })
    }
  }

  //used chat GPT to help determine why my function wasn't properly converting into F. 
  const kelvinToFahrenheit = (kelvin) => {
    return Math.round(((kelvin - 273.15) * 9/5 + 32).toFixed(2));
  }

  return (
    <div className='container'>
      <input 
      type="text" 
      className='location-input' 
      placeholder='Enter City'
      onChange={e => setCity(e.target.value)}
      value={city} 
      onKeyDown={getWeather}
      />

      {typeof weatherData.main === 'undefined' ? (
        <div>
          <p>Hello! I'm ready to display the weather.</p>
        </div>
      ): (
        <div className="weather-data">
          <h2 className='city'>{weatherData.name}</h2>
          <h4 className='temp'>{kelvinToFahrenheit(weatherData.main.temp)}&deg;F</h4>
          <h4 className='weather'>{weatherData.weather[0].main}</h4>
        </div>
      )}

      {weatherData.cod === '404' ? (
        <p>City not found...</p>
      ) : (
        <>
        </>
      )
      }

    </div>
  )
}

export default App
