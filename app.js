let currentWeatherData;

const init = async () => {
  const weatherData = await getWeatherData('London');
  currentWeatherData = processWeatherData(weatherData);
  renderWeather();
  addSearchEventListener();
  addUnitsToggleEventListeners();
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

  currentWeatherData = processWeatherData(weatherData);

  renderWeather();
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

const renderWeather = () => {
  const activeUnitButton = document.querySelector('.units-toggle .active');
  const contentContainer = document.querySelector('.content-container');
  const location = contentContainer.querySelector('.location');
  const temperature = contentContainer.querySelector('.temperature');
  const feelsLikeTemperature = contentContainer.querySelector('.feels-like-temperature');
  const wind = contentContainer.querySelector('.wind');
  const humidity = contentContainer.querySelector('.humidity');

  location.textContent = `${currentWeatherData.city}, ${currentWeatherData.country}`;
  humidity.textContent = `Humidity: ${currentWeatherData.humidity}%`;

  if (activeUnitButton.textContent === 'Metric') {
    temperature.textContent = `${Math.round(currentWeatherData.temperature)} \u00B0C`;
    feelsLikeTemperature.textContent = `Feels like: ${Math.round(currentWeatherData.feelsLikeTemperature)} \u00B0C`;
    wind.textContent = `Wind: ${Math.round(currentWeatherData.wind)} m/s`;
  } else if (activeUnitButton.textContent === 'Imperial') {
    temperature.textContent = `${Math.round(currentWeatherData.temperature * 9 / 5 + 32)} \u00B0F`;
    feelsLikeTemperature.textContent = `Feels like: ${Math.round(currentWeatherData.feelsLikeTemperature * 9 / 5 + 32)} \u00B0F`;
    wind.textContent = `Wind: ${Math.round(currentWeatherData.wind * 3.281)} ft/s`;
  }
};

const renderResponseMessage = (message) => {
  const responseMessage = document.querySelector('.response-message');

  responseMessage.textContent = message;
};

const addUnitsToggleEventListeners = () => {
  const metricButton = document.querySelector('.units-toggle .metric');
  const imperialButton = document.querySelector('.units-toggle .imperial');

  metricButton.addEventListener('click', () => {
    metricButton.classList.add('active');
    imperialButton.classList.remove('active');
    renderWeather()
  });

  imperialButton.addEventListener('click', () => {
    imperialButton.classList.add('active');
    metricButton.classList.remove('active');
    renderWeather();
  });
};

init();