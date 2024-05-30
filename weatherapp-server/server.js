const express = require('express'); 
const config = require('./config');
var cors = require('cors')
const app = express();
app.options('*', cors())
const port = 3000 || process.env.PORT;

app.get('/image/:city', async(req, res) => {

  console.log('get image url')
 const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${req.params.city}&key=${config.GOOGLE_API_KEY}&inputtype=textquery&fields=name,photos`;
 const result = await fetch(url);
 const response = await result.json();
 console.log(response);
 const photoreference = response["candidates"][0]["photos"][0]["photo_reference"];
 const imageurl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoreference}&key=${config.GOOGLE_API_KEY}&maxwidth=400&maxheight=400`
 res.send(imageurl);
})

app.get('/:city', async (req, res) => {
    const url = `http://api.weatherapi.com/v1/current.json?key=${config.WEATHER_API_KEY}&q=${req.params.city}&aqi=no`;
    const result = await fetch(url)
    const response = await result.json();
    res.send(response)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});