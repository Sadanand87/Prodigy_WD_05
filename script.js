const apiKey = '71a4d66a45dca00eb7eba1c448d68dd2'; 

function displayWeather(data) {
  const weatherDiv = document.getElementById('weatherDisplay');

  if (data.cod !== 200) {
    weatherDiv.innerHTML = `<p>Error: ${data.message}</p>`;
    return;
  }

  weatherDiv.innerHTML = `
    <h3>${data.name}, ${data.sys.country}</h3>
    <p>🌡️ Temperature: ${(data.main.temp - 273.15).toFixed(2)} °C</p>
    <p>☁️ Weather: ${data.weather[0].description}</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>🌬️ Wind Speed: ${data.wind.speed} m/s</p>
  `;
}

async function getWeatherByCity() {
  const city = document.getElementById('locationInput').value;
  if (!city) return alert("Please enter a city name.");

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    const data = await res.json();
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather by city:", error);
  }
}

function getWeatherByGeolocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
      const data = await res.json();
      displayWeather(data);
    } catch (error) {
      console.error("Error fetching weather by geolocation:", error);
    }
  }, () => {
    alert("Unable to retrieve your location.");
  });
}
