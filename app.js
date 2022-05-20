const init = async () => {
  const weatherData = await getWeatherData('London');
  const processedWeatherData = processWeatherData(weatherData);

  renderWeather(processedWeatherData);
  addSearchEventListener();
}

const addSearchEventListener = () => {
  const searchButton = document.querySelector('.search-container .icon');

  searchButton.addEventListener('click', searchEvent);
};

const searchEvent = async () => {
  const input = document.querySelector('.search-container input');
  
  if (input.value === '') {
    renderResponseMessage('Please enter a city');

    return;
  }

  renderResponseMessage('')
  const weatherData = await getWeatherData(input.value);

  if (!weatherData) {
    return;
  }

  const processedWeatherData = processWeatherData(weatherData);

  renderWeather(processedWeatherData);
};

const getWeatherData = async (city) => {
  try {
    const apiKey = 'a424ef2f751e5afc06fa27463584df1d';
    const apiCallString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiCallString, {mode: 'cors'});

    if (!response.ok) {
      throw response.statusText;
    }

    const data = response.json();
  
    return data;
  } catch (error) {
    renderResponseMessage(error);
  }
};

const processWeatherData = (data) => {
  const city = data.name;
  const country = data.sys.country;
  const temperature = data.main.temp;
  const feelsLikeTemperature = data.main.feels_like;
  const wind = data.wind.speed;
  const humidity = data.main.humidity;
  
  return {city, 
          country, 
          temperature, 
          feelsLikeTemperature, 
          wind, 
          humidity};
};

const renderWeather = (data) => {
  const contentContainer = document.querySelector('.content-container');
  const location = contentContainer.querySelector('.location');
  const temperature = contentContainer.querySelector('.temperature');
  const feelsLikeTemperature = contentContainer.querySelector('.feels-like-temperature');
  const wind = contentContainer.querySelector('.wind');
  const humidity = contentContainer.querySelector('.humidity');

  location.textContent = `${data.city}, ${data.country}`;
  temperature.textContent = `${Math.round(data.temperature)} \u00B0C`;
  feelsLikeTemperature.textContent = `Feels like: ${Math.round(data.feelsLikeTemperature)} \u00B0C`;
  wind.textContent = `Wind: ${Math.round(data.wind)} m/s`;
  humidity.textContent = `Humidity: ${data.humidity}%`;
};

const renderResponseMessage = (message) => {
  const responseMessage = document.querySelector('.response-message');

  responseMessage.textContent = message;
};

init();