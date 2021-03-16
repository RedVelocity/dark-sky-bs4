import axios from 'axios';

export function getWeather(latitude, longitude) {
  // const exclude = "[minutely,flags]";
  const api = `.netlify/functions/getWeather?latitude=${latitude}&longitude=${longitude}`;
  return axios
    .get(api)
    .then((res) => {
      console.log('weather data', res.data);
      return res.status === 200 ? res.data : 0;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
}

export function getLocation(latitude, longitude) {
  const api = `.netlify/functions/getLocation?latitude=${latitude}&longitude=${longitude}`;
  return axios
    .get(api)
    .then((res) => {
      return res.data.features.length !== 0 ? res.data : 0;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
}

export function getSuggestions(latitude, longitude, place) {
  const api = `.netlify/functions/getSuggestions?latitude=${latitude}&longitude=${longitude}&place=${place}`;
  return axios
    .get(api)
    .then((res) => {
      return res.data.features.length !== 0 ? res.data : 0;
    })
    .catch((error) => {
      console.log(error);
      return 0;
    });
}
