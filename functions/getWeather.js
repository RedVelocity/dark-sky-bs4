const axios = require('axios');
const querystring = require('querystring');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  console.log(event.body);
  const params = querystring.parse(event.body);
  const { latitude, longitude } = params;
  const API_ENDPOINT = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely,flags]`;
  return (
    axios
      .get(API_ENDPOINT, { headers: { Accept: 'application/json' } })
      // .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return {
          statusCode: 200,
          body: data,
        };
      })
      .catch((error) => ({ statusCode: 422, body: String(error) }))
  );
};
