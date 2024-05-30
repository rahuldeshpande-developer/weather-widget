const express = require('express'); 
const config = require('./config');
var cors = require('cors')
const app = express();
app.options('*', cors())
const port = 3000 || process.env.PORT;

app.get('/:city', async (req, res) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${config.API_KEY}&q=${req.params.city}&aqi=no`;
    const result = await fetch(url)
    const response = await result.json();
    res.send(response)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});