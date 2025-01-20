// App.jsx
import React, { useState } from 'react';
import './App.css';

const App = () => {

  const [city, setCity] = useState('');
  const[weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    if (!city) {
      alert('Por favor, ingresa una ciudad correcta')
      return;
    }

    const apiKey ='cef64028f057736589d49b36ea014b6f'

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


    try {
      const response = await fetch(url);
      if(!response.ok) {
        throw new Error('Ciudad no encontrada');
      }

      const data = await response.json();
      setWeatherData(data);

    } catch (error) {
      alert(error.message)
    }
  }


return (

  <div className="App">
  <header>
    <h1>Weather App</h1>
  </header>
  <main>
    <section id="weather-form">
      <input
        type="text"
        placeholder="Escribe una ciudad"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </section>
    <section id="weather-result">
      {weatherData && (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperatura: {weatherData.main.temp}°C</p>
          <p>Clima: {weatherData.weather[0].description}</p>
          <p>Humedad: {weatherData.main.humidity}%</p>
        </div>
      )}
    </section>
  </main>
</div>
);

};

export default App;
