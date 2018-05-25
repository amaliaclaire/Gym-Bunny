const express = require('express');
const app = express()
const path = require('path');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const port = process.env.PORT || 3001
const cors = require('cors')


app.disable('x-powered-by')
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var index = require('./src/routes/index');
var gym_bunny = require('./src/routes/gym_bunny');

// app.use('/', index);
app.use('/', gym_bunny);


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

// app.use(logger('dev'));

// app.use(express.static(path.join(__dirname, 'public')));

const listener = () => console.log(`listening on port ${port}`);
app.listen(port, listener)

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
})


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('err:', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
