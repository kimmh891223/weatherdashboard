var textboxEl = document.getElementById("textbox");
var searchBtn = document.getElementById("searchBtn");
var cityListEl = document.getElementById("cityList");
var weatherInfoEl = document.getElementsByClassName("weatherInfo");
var cityNameEl = document.getElementById("cityName");
var dateEl = document.getElementById("date");
var weatherEl = document.getElementById("weather");
var tempEl = document.getElementById("temp");
var windEl = document.getElementById("wind");
var humidityEl = document.getElementById("humidity");
var forecastEl = document.getElementsByClassName("forecast");
var day1El = document.getElementsByClassName("day1");
var day2El = document.getElementsByClassName("day2");
var day3El = document.getElementsByClassName("day3");
var day4El = document.getElementsByClassName("day4");
var day5El = document.getElementsByClassName("day5");
var day1DateEl = document.getElementById("day1Date");
var day1WeatherEl = document.getElementById("day1Weather");
var day1TempEl = document.getElementById("day1Temp");
var day1WindEl = document.getElementById("day1Wind");
var day1HumidityEl = document.getElementById("day1Humidity");
var day2DateEl = document.getElementById("day2Date");
var day2WeatherEl = document.getElementById("day2Weather");
var day2TempEl = document.getElementById("day2Temp");
var day2WindEl = document.getElementById("day2Wind");
var day2HumidityEl = document.getElementById("day2Humidity");
var day3DateEl = document.getElementById("day3Date");
var day3WeatherEl = document.getElementById("day3Weather");
var day3TempEl = document.getElementById("day3Temp");
var day3WindEl = document.getElementById("day3Wind");
var day3HumidityEl = document.getElementById("day3Humidity");
var day4DateEl = document.getElementById("day4Date");
var day4WeatherEl = document.getElementById("day4Weather");
var day4TempEl = document.getElementById("day4Temp");
var day4WindEl = document.getElementById("day4Wind");
var day4HumidityEl = document.getElementById("day4Humidity");
var day5DateEl = document.getElementById("day5Date");
var day5WeatherEl = document.getElementById("day5Weather");
var day5TempEl = document.getElementById("day5Temp");
var day5WindEl = document.getElementById("day5Wind");
var day5HumidityEl = document.getElementById("day5Humidity");
var searchHistoryEl = document.getElementById("searchHistory");


function getGeoApi() {
    
    // clearing the content screen when another search is clicked.
    cityNameEl.innerHTML = '';
    dateEl.innerHTML = '';
    weatherEl.innerHTML = '';
    tempEl.innerHTML = '';
    windEl.innerHTML = '';
    humidityEl.innerHTML = '';
    forecastEl.innerHTML = '';
    
    day1DateEl.innerHTML = '';
    day1WeatherEl.innerHTML = '';
    day1TempEl.innerHTML = '';
    day1WindEl.innerHTML = '';
    day1HumidityEl.innerHTML = '';
    
    day2DateEl.innerHTML = '';
    day2WeatherEl.innerHTML = '';
    day2TempEl.innerHTML = '';
    day2WindEl.innerHTML = '';
    day2HumidityEl.innerHTML = '';

    day3DateEl.innerHTML = '';
    day3WeatherEl.innerHTML = '';
    day3TempEl.innerHTML = '';
    day3WindEl.innerHTML = '';
    day3HumidityEl.innerHTML = '';

    day4DateEl.innerHTML = '';
    day4WeatherEl.innerHTML = '';
    day4TempEl.innerHTML = '';
    day4WindEl.innerHTML = '';
    day4HumidityEl.innerHTML = '';

    day5DateEl.innerHTML = '';
    day5WeatherEl.innerHTML = '';
    day5TempEl.innerHTML = '';
    day5WindEl.innerHTML = '';
    day5HumidityEl.innerHTML = '';
    
    cityListEl.replaceChildren();

    // Calling the coordinate of the city
    var requestUrl1 = 'http://api.openweathermap.org/geo/1.0/direct?q=' + textboxEl.value + '&limit=5&appid=eacb09a896b03f7a18a225f5cca578d5';
    fetch(requestUrl1)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            // Option to choose between cities with the same name
            cityPick();
            function cityPick() {
                for (var i = 0; i < data.length; i++) {
                    var cityList = document.createElement("li");
                    cityList.setAttribute("style", "list-style: none; color: white; background-color: dodgerblue; border: 1px solid black; border-radius: 5px; padding: 5px; margin: 5px;")
                    cityList.setAttribute("id", "listItems" + [i]);
                    cityList.setAttribute("lat", data[i].lat);
                    cityList.setAttribute("lon", data[i].lon);
                    cityList.setAttribute("name",data[i].name +", "+ data[i].state +", "+ data[i].country);
                    cityList.textContent = data[i].name +", "+ data[i].state +", "+ data[i].country;
                    cityListEl.appendChild(cityList)

                    
                    var listItems = document.getElementById("listItems"+[i])
                    
                    // event listener for local storage but I could not make it work
                    listItems.addEventListener("click", function(event) {
                        event.preventDefault();
                        everything();

                        var targetCityObjArr =[];
                        var targetCityObj = {
                            name: event.target.getAttribute("name"),
                            lat: event.target.getAttribute("lat"),
                            lon: event.target.getAttribute("lon")
                        }

                        targetCityObjArr.push(targetCityObj);

                        console.log(targetCityObjArr);

                        function setInfo () {         
                                    
                            localStorage.setItem("obj",JSON.stringify(targetCityObjArr));                           
                            
                        }
                        
                        setInfo();


                        function renderInfo () {
                            for (var i = 0; i < targetCityObjArr.length; i++) {                                              
                                var searchHistoryList = document.createElement("li");
                                searchHistoryList.setAttribute("style", "list-style: none; color: white; background-color: dodgerblue; border: 1px solid black; border-radius: 5px; padding: 5px; margin: 5px; ")
                                searchHistoryList.setAttribute("data-index", i)
                                var storedHistoryList = JSON.parse(localStorage.getItem("obj"))                     
                                searchHistoryList.textContent = storedHistoryList[i].name;
                                searchHistoryEl.appendChild(searchHistoryList);
                            }
                            searchHistoryList.addEventListener("click",function(event) {
                                everything();
                            })
                            
                        }
                        renderInfo(); 
                        
                        function everything () {
                        // Calling the weather information of the city
                            var cityLat = event.target.getAttribute("lat");
                            var cityLon = event.target.getAttribute("lon");
                            cityListEl.replaceChildren();

                            var requestUrl2 = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ cityLat +'&lon='+ cityLon +'&appid=eacb09a896b03f7a18a225f5cca578d5'
                            console.log(requestUrl2);
                            fetch(requestUrl2)
                                .then(function(response) {
                                    return response.json();
                                })
                                .then(function(data1) {
                                    var cityWeatherObj = data1;
                                    console.log(cityWeatherObj);
                                    console.log(cityWeatherObj.list[0],cityWeatherObj.list[8],cityWeatherObj.list[16],cityWeatherObj.list[24],cityWeatherObj.list[32], cityWeatherObj.list[39])
                                    var date0 = dayjs(cityWeatherObj.list[0].dt_txt).format("MM-DD-YYYY");
                                    var cityName = event.target.getAttribute("name");
                                    cityNameEl.innerHTML = cityName;
                                    dateEl.innerHTML = date0;
                                    console.log(cityWeatherObj.list[0].weather[0].main);
                                    
                                    function weatherEmoji () {
                                        if (cityWeatherObj.list[0].weather[0].main === "Clear"){
                                            weatherEl.innerHTML = '☀️';
                                        } else if (cityWeatherObj.list[0].weather[0].description === "few clouds") {
                                            weatherEl.innerHTML = '🌤️';
                                        } else if (cityWeatherObj.list[0].weather[0].description === "scattered clouds") {
                                            weatherEl.innerHTML = '🌥️';    
                                        } else if (cityWeatherObj.list[0].weather[0].description === "broken clouds") {
                                            weatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[0].weather[0].description === "overcast clouds") {
                                            weatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[0].weather[0].main === "Drizzle") {
                                            weatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[0].weather[0].main === "Rain") {
                                            weatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[0].weather[0].main === "Thunderstorm") {
                                            weatherEl.innerHTML = '⛈️';
                                        } else if (cityWeatherObj.list[0].weather[0].main === "Snow") {
                                            weatherEl.innerHTML = '🌨️';
                                        } else if (cityWeatherObj.list[0].weather[0].main === "Atmosphere") {
                                            weatherEl.innerHTML = '⚠️';
                                        }
                                    }
                                    weatherEmoji();

                                    //kelvin to celsius
                                    var tempCel = Math.ceil(cityWeatherObj.list[0].main.temp - 273.15);                           
                                    tempEl.innerHTML = "Temp: " + tempCel + "℃";
                                    windEl.innerHTML = "Wind: " + cityWeatherObj.list[0].wind.speed + "MPH";
                                    humidityEl.innerHTML = "Humidity: " + cityWeatherObj.list[0].main.humidity + "%";
                                    

                                    // forecast day1
                                    var date1 = dayjs(cityWeatherObj.list[8].dt_txt).format("MM-DD-YYYY");
                                    day1DateEl.innerHTML = date1;
                                    function weatherEmoji1 () {
                                        if (cityWeatherObj.list[8].weather[0].main === "Clear"){
                                            day1WeatherEl.innerHTML = '☀️';
                                        } else if (cityWeatherObj.list[8].weather[0].description === "few clouds") {
                                            day1WeatherEl.innerHTML = '🌤️';
                                        } else if (cityWeatherObj.list[8].weather[0].description === "scattered clouds") {
                                            day1WeatherEl.innerHTML = '🌥️';    
                                        } else if (cityWeatherObj.list[8].weather[0].description === "broken clouds") {
                                            day1WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[8].weather[0].description === "overcast clouds") {
                                            day1WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[8].weather[0].main === "Drizzle") {
                                            day1WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[8].weather[0].main === "Rain") {
                                            day1WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[8].weather[0].main === "Thunderstorm") {
                                            day1WeatherEl.innerHTML = '⛈️';
                                        } else if (cityWeatherObj.list[8].weather[0].main === "Snow") {
                                            day1WeatherEl.innerHTML = '🌨️';
                                        } else if (cityWeatherObj.list[8].weather[0].main === "Atmosphere") {
                                            day1WeatherEl.innerHTML = '⚠️';
                                        }
                                    }
                                    weatherEmoji1();

                                    var tempCel1 = Math.ceil(cityWeatherObj.list[8].main.temp - 273.15);
                                    day1TempEl.innerHTML = "Temp: " + tempCel1 + "℃";
                                    day1WindEl.innerHTML = "Wind: " + cityWeatherObj.list[8].wind.speed + "MPH";
                                    day1HumidityEl.innerHTML = "Humidity: " + cityWeatherObj.list[8].main.humidity + "%";

                                    // forecast day2
                                    var date2 = dayjs(cityWeatherObj.list[16].dt_txt).format("MM-DD-YYYY");
                                    day2DateEl.innerHTML = date2;
                                    function weatherEmoji2 () {
                                        if (cityWeatherObj.list[16].weather[0].main === "Clear"){
                                            day2WeatherEl.innerHTML = '☀️';
                                        } else if (cityWeatherObj.list[16].weather[0].description === "few clouds") {
                                            day2WeatherEl.innerHTML = '🌤️';
                                        } else if (cityWeatherObj.list[16].weather[0].description === "scattered clouds") {
                                            day2WeatherEl.innerHTML = '🌥️';    
                                        } else if (cityWeatherObj.list[16].weather[0].description === "broken clouds") {
                                            day2WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[16].weather[0].description === "overcast clouds") {
                                            day2WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[16].weather[0].main === "Drizzle") {
                                            day2WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[16].weather[0].main === "Rain") {
                                            day2WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[16].weather[0].main === "Thunderstorm") {
                                            day2WeatherEl.innerHTML = '⛈️';
                                        } else if (cityWeatherObj.list[16].weather[0].main === "Snow") {
                                            day2WeatherEl.innerHTML = '🌨️';
                                        } else if (cityWeatherObj.list[16].weather[0].main === "Atmosphere") {
                                            day2WeatherEl.innerHTML = '⚠️';
                                        }
                                    }
                                    weatherEmoji2();

                                    var tempCel2 = Math.ceil(cityWeatherObj.list[16].main.temp - 273.15);
                                    day2TempEl.innerHTML = "Temp: " + tempCel2 + "℃";
                                    day2WindEl.innerHTML = "Wind: " + cityWeatherObj.list[16].wind.speed + "MPH";
                                    day2HumidityEl.innerHTML = "Humidity: " + cityWeatherObj.list[16].main.humidity + "%";

                                    // forecast day3
                                    var date3 = dayjs(cityWeatherObj.list[24].dt_txt).format("MM-DD-YYYY");
                                    day3DateEl.innerHTML = date3;
                                    function weatherEmoji3 () {
                                        if (cityWeatherObj.list[24].weather[0].main === "Clear"){
                                            day3WeatherEl.innerHTML = '☀️';
                                        } else if (cityWeatherObj.list[24].weather[0].description === "few clouds") {
                                            day3WeatherEl.innerHTML = '🌤️';
                                        } else if (cityWeatherObj.list[24].weather[0].description === "scattered clouds") {
                                            day3WeatherEl.innerHTML = '🌥️';    
                                        } else if (cityWeatherObj.list[24].weather[0].description === "broken clouds") {
                                            day3WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[24].weather[0].description === "overcast clouds") {
                                            day3WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[24].weather[0].main === "Drizzle") {
                                            day3WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[24].weather[0].main === "Rain") {
                                            day3WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[24].weather[0].main === "Thunderstorm") {
                                            day3WeatherEl.innerHTML = '⛈️';
                                        } else if (cityWeatherObj.list[24].weather[0].main === "Snow") {
                                            day3WeatherEl.innerHTML = '🌨️';
                                        } else if (cityWeatherObj.list[24].weather[0].main === "Atmosphere") {
                                            day3WeatherEl.innerHTML = '⚠️';
                                        }
                                    }
                                    weatherEmoji3();

                                    var tempCel3 = Math.ceil(cityWeatherObj.list[24].main.temp - 273.15);
                                    day3TempEl.innerHTML = "Temp: " + tempCel3 + "℃";
                                    day3WindEl.innerHTML = "Wind: " + cityWeatherObj.list[24].wind.speed + "MPH";
                                    day3HumidityEl.innerHTML = "Humidity: " + cityWeatherObj.list[24].main.humidity + "%";

                                    // forecast day4
                                    var date4 = dayjs(cityWeatherObj.list[32].dt_txt).format("MM-DD-YYYY");
                                    day4DateEl.innerHTML = date4;
                                    function weatherEmoji4 () {
                                        if (cityWeatherObj.list[32].weather[0].main === "Clear"){
                                            day4WeatherEl.innerHTML = '☀️';
                                        } else if (cityWeatherObj.list[32].weather[0].description === "few clouds") {
                                            day4WeatherEl.innerHTML = '🌤️';
                                        } else if (cityWeatherObj.list[32].weather[0].description === "scattered clouds") {
                                            day4WeatherEl.innerHTML = '🌥️';    
                                        } else if (cityWeatherObj.list[32].weather[0].description === "broken clouds") {
                                            day4WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[32].weather[0].description === "overcast clouds") {
                                            day4WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[32].weather[0].main === "Drizzle") {
                                            day4WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[32].weather[0].main === "Rain") {
                                            day4WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[32].weather[0].main === "Thunderstorm") {
                                            day4WeatherEl.innerHTML = '⛈️';
                                        } else if (cityWeatherObj.list[32].weather[0].main === "Snow") {
                                            day4WeatherEl.innerHTML = '🌨️';
                                        } else if (cityWeatherObj.list[32].weather[0].main === "Atmosphere") {
                                            day4WeatherEl.innerHTML = '⚠️';
                                        }
                                    }
                                    weatherEmoji4();

                                    var tempCel4 = Math.ceil(cityWeatherObj.list[32].main.temp - 273.15);
                                    day4TempEl.innerHTML = "Temp: " + tempCel4 + "℃";
                                    day4WindEl.innerHTML = "Wind: " + cityWeatherObj.list[32].wind.speed + "MPH";
                                    day4HumidityEl.innerHTML = "Humidity: " + cityWeatherObj.list[32].main.humidity + "%";

                                    // forecast day5
                                    var date5 = dayjs(cityWeatherObj.list[39].dt_txt).format("MM-DD-YYYY");
                                    day5DateEl.innerHTML = date5;
                                    function weatherEmoji5 () {
                                        if (cityWeatherObj.list[39].weather[0].main === "Clear"){
                                            day5WeatherEl.innerHTML = '☀️';
                                        } else if (cityWeatherObj.list[39].weather[0].description === "few clouds") {
                                            day5WeatherEl.innerHTML = '🌤️';
                                        } else if (cityWeatherObj.list[39].weather[0].description === "scattered clouds") {
                                            day5WeatherEl.innerHTML = '🌥️';    
                                        } else if (cityWeatherObj.list[39].weather[0].description === "broken clouds") {
                                            day5WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[39].weather[0].description === "overcast clouds") {
                                            day5WeatherEl.innerHTML = '☁️';
                                        } else if (cityWeatherObj.list[39].weather[0].main === "Drizzle") {
                                            day5WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[39].weather[0].main === "Rain") {
                                            day5WeatherEl.innerHTML = '🌧️';
                                        } else if (cityWeatherObj.list[39].weather[0].main === "Thunderstorm") {
                                            day5WeatherEl.innerHTML = '⛈️';
                                        } else if (cityWeatherObj.list[39].weather[0].main === "Snow") {
                                            day5WeatherEl.innerHTML = '🌨️';
                                        } else if (cityWeatherObj.list[39].weather[0].main === "Atmosphere") {
                                            day5WeatherEl.innerHTML = '⚠️';
                                        }
                                    }
                                    weatherEmoji5();

                                    var tempCel5 = Math.ceil(cityWeatherObj.list[39].main.temp - 273.15);
                                    day5TempEl.innerHTML = "Temp: " + tempCel5 + "℃";
                                    day5WindEl.innerHTML = "Wind: " + cityWeatherObj.list[39].wind.speed + "MPH";
                                    day5HumidityEl.innerHTML = "Humidity: " + cityWeatherObj.list[39].main.humidity + "%";

                                })
                        }
                    })
                }
            }
            

            
                

        })
    
    
}


searchBtn.addEventListener("click", getGeoApi)
