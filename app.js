const express = require('express');
const morgan = require('morgan');
const config = require('./app/config')

const app = express();

app.use(morgan('combined'));
app.use(express.static(__dirname + '/public'));

require('./app/routes/index')(app);
require('./app/routes/generate')(app);

const port = process.env.PORT || config.port;

const server = app.listen(port, () => {
  console.log('Server ready on:', port);
});
