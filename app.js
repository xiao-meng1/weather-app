const getWeatherData = async (city) => {
  const apiKey = 'a424ef2f751e5afc06fa27463584df1d';
  const apiCallString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiCallString, {mode: 'cors'});
  const data = response.json();

  return data;
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

const addSearchEventListener = () => {
  const searchButton = document.querySelector('.search-container .icon');

  searchButton.addEventListener('click', searchEvent);
};

const searchEvent = async () => {
  const input = document.querySelector('.search-container input');
  const weatherData = await getWeatherData(input.value);
  const processedWeatherData = processWeatherData(weatherData);

  renderDOMContent(processedWeatherData);
};

const renderDOMContent = (data) => {
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

addSearchEventListener();
