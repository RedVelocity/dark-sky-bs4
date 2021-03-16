const axios = require('axios');
const querystring = require('querystring');

exports.handler = async (event) => {
  console.log(event, 'event');
  const { latitude, longitude } = event.querystring;
  const API_ENDPOINT = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely,flags]`;

  try {
    const { data } = await axios.get(API_ENDPOINT);
    console.log(data, 'data');
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    return { statusCode: 422, body: String(error) };
  }
};
