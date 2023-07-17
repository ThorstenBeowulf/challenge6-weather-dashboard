const city = {
    name: '',
    lat: 0,
    lon: 0
}

const apiKey = "317cbb2061b1e1b59c090c3580e35f04";

//api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// $('#search-form').val()


// api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
async function geoCode(cityName) {
    let geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
    // console.log(geoCodeUrl);
    fetch(geoCodeUrl)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
                console.log(response);
                return response.json();
        })
        .then(function (geoRes) {
            if (!geoRes) {
                console.log('geocode ---> No results found!');
            } else {
                console.log(geoRes);
                saveCity(geoRes);
                let lat = geoRes[0].lat;
                let lon = geoRes[0].lon;
                weatherApi(lat, lon);
                renderCityHistory();
                return geoRes;
            }
        })
        .catch(function (error) {
            console.error(error);
        })
}

async function weatherApi(lat, lon) {
    let weatherQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    console.log(weatherQuery);
    fetch(weatherQuery)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
                return response.json();
        })
        .then(function (weatherRes) {

            if (!weatherRes) {
                console.log('weatherapi ---> No results found!');
            } else {
                console.log(weatherRes)
                // console.log(locRes.weather[0].description);
                // console.log(locRes.main.temp + "°C");
            }
        })
        .catch(function (error) {
            console.error(error);
        });
}

async function getWeather(event) {
    event.preventDefault();
    let cityWeather;
    let cityGeoCode;
    const cityName = $('#city-input').val();
    if (!cityName) {
        console.log("invalid input");
        return;
    }
        // if city name already exists load obj
        // save city name and geocode data in city obj
    cityGeoCode = await geoCode(cityName);
    setTimeout(() => {
        console.log(cityGeoCode);
    }, 4000);

        // let lat = cityGeoCode[0].lat;
        // let lon = cityGeoCode[0].lon;
        // cityWeather = await weatherApi(lat, lon);

        // console.log(cityWeather);

        

    

}
   

$('#search-form').on('submit', getWeather);


function saveCity(geoRes) {
    city.name = geoRes[0].name;
    city.lat = geoRes[0].lat;
    city.lon = geoRes[0].lon;

    localStorage.setItem( city.name, JSON.stringify(city));
}

function loadCity(cityName) {
    return localStorage.getItem(JSON.parse(cityName));
}

function renderCityHistory() {
    // $('#search-history').innerhtml = ;
}

// const getWeather = (event) => {
//     event.preventDefault();
//     const cityName = $('#city-input').val();
//     if (!cityName) {
//         console.log("invalid input");
//         return;
//     } else {
//         let geoCodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;
//         console.log(geoCodeUrl);
//         fetch(geoCodeUrl)
//             .then(!response ? (throw response.json()) : (return response.json()))
//             .then(function (geoRes) {

//                 if (!geoRes) {
//                     console.log('No results found!');
//                 } else {
//                     console.log(geoRes);
//                     let weatherQuery = `https://api.openweathermap.org/data/2.5/weather?lat=${geoRes[0].lat}&lon=${geoRes[0].lon}&appid=${apiKey}&units=metric`;
//                     console.log(weatherQuery);
//                     fetch(weatherQuery)
//                         .then(function (response) {
//                             if (!response.ok) {
//                                 throw response.json();
//                             }
//                                 return response.json();
//                         })
//                         .then(function (locRes) {

//                             if (!locRes) {
//                                 console.log('No results found!');
//                             } else {
//                                 console.log(locRes.weather[0].description);
//                                 console.log(locRes.main.temp + "°C");
//                             }
//                         })
//                         .catch(function (error) {
//                             console.error(error);
//                         });
//                 }
//             })
//             .catch(function (error) {
//                 console.error(error);
//             });
//     }
   
// }

// $('#search-form').on('submit', getWeather);

