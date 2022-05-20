const getWeatherData = async (city) => {
  const apiKey = 'a424ef2f751e5afc06fa27463584df1d';
  const apiCallString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiCallString, {mode: 'cors'});
  const data = await response.json();
  return data;
};

const processWeatherData = () => {

}

const data = getWeatherData('Edmonton')
