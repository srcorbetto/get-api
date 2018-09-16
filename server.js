const express = require('express');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

// Allow for CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// GIPHY Weather API - .gif ID
app.get('/api/gif/:id', (req, res) => {
  axios.get('https://api.giphy.com/v1/gifs/' + req.params.id + '?api_key=' + process.env.GIPHY_WEATHER_API_KEY)
  .then(response => {
      res.send({
        data: response.data.data.images.fixed_height.url
      });
  })
  .catch(function (error) {
      console.log(error);
      return error
    });
});

// GIPHY Weather API - Get weather
app.get('/api/weather/:city', (req, res) => {
  axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + req.params.city + '&appid=' + process.env.OPEN_WEATHER_GIPHY_WEATHER_API_KEY)
  .then(response => {
      res.send({
        data: response.data
      });
      console.log(response.data);
  })
  .catch(function (error) {
      console.log(error);
      return error
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));