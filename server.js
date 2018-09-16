const express = require('express');
const axios = require('axios')
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();

app.get('/api/hello', (req, res) => {
    console.log(req.params);
  res.send({ express: 'Hello From Express' });
});

// GIPHY Weather API - .gif ID
app.get('/api/gif/:id', (req, res) => {
  axios.get('https://api.giphy.com/v1/gifs/' + req.params.id + '?api_key=' + process.env.GIPHY_WEATHER_API_KEY)
  .then(response => {
    console.log(response.data.data.images.fixed_height.url);
      res.send({
        url: response.data.data.images.fixed_height.url,
        id: req.params.id,
        APIKey: process.env.GIPHY_WEATHER_API_KEY
      });
  })
  .catch(function (error) {
      console.log(error);
      return error
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));