const apiKey = 'd3c39f57206d5904890771c822ffaac3';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");

const text_input = document.querySelector("input");

var weatherIcon = document.querySelector(".weather-icon");


text_input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchButton.click(); 
    }
  });

searchButton.addEventListener('click', () => {
    consumeApiWithAxios(searchInput.value);
});




async function consumeApiWithAxios(city) {
    const url = apiUrl + city + `&appid=${apiKey}`

    try {
      const response = await axios.get(url);
      getDataFromApiResponse(response.data)
      console.log(`la petición a la api se completo correctamente con status: ${response.status}`);
      document.querySelector(".error").style.display = "none";
      return await response.data;
    } catch (error) {
      console.log(`fallo la petición a la api con error: ${error.message}`);
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      return response.error;
    }
  }

  async function getDataFromApiResponse(response) {
    const data =  await response;

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
    }
    else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
  }

  
