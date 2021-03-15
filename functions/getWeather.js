const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  };
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }
  // When the method is POST, the name will no longer be in the event’s
  // queryStringParameters – it’ll be in the event body encoded as a query string
  const params = querystring.parse(event.body);
  const { latitude, longitude } = params;
  const API_ENDPOINT = `https://api.darksky.net/forecast/${process.env.REACT_APP_DARKSKY_KEY}/${latitude},${longitude}?units=ca&exclude=[minutely,flags]`;
  return fetch(API_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      headers,
      body: data,
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};
