require('dotenv').config();
const express = require('express');
const app = express();

// middlewares
const errorHandler = require('./middlewares/errorHandler');
//

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/", (req, res) => {
  res.json({
    unix : Date.now(),
    utc : new Date(Date.now()).toUTCString()
  })
});

app.get('/api/:date', (req, res, next) => {
    const dateString = req.params.date ?? null;

    const date = isNaN(dateString)
      ? new Date(dateString)
      : new Date(Number(dateString));
    
    if (isNaN(date)) {
      next(new Error(date.toString()));
      return;
    };

    res.json({
      unix: Date.parse(date),
      utc: date.toUTCString(),
    });
  });

app.use(errorHandler);

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});