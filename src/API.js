import axios from 'axios';

export function getWeather(latitude, longitude) {
  // const exclude = "[minutely,flags]";
  const api = ``;
  return axios
    .get(api, { latitude, longitude })
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
  let api = encodeURI(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&types=place&language=en&limit=1`
  );
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
  let proximity;
  latitude !== null
    ? (proximity = '&proximity=' + longitude + ',' + latitude)
    : (proximity = '');
  const api = encodeURI(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${process.env.REACT_APP_MAPBOX_KEY}&types=place,locality${proximity}&language=en&limit=10`
  );
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
