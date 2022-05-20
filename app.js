const getWeatherData = async (city) => {
  const apiKey = 'a424ef2f751e5afc06fa27463584df1d';
  const apiCallString = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiCallString, {mode: 'cors'});
  const data = response.json();
  console.log(data)
  return data;
};

const processWeatherData = (data) => {
  console.log(data)
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
}


(async () => {
  const data = await getWeatherData('Guangzhou');
  const processedData = processWeatherData(data);
  console.log(processedData)
})();
