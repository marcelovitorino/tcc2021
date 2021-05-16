const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Geolocation = require('./models/geolocation');
const Acceleration = require('./models/acceleration');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.json('Structural Health Monitoring - SHM - (UFCG/UFPB/UNB) API.')
})

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

app.get('/accelerations', async function (req, res) {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

  await Acceleration.find()
      .sort([[sortBy, order]])
      //.limit(limit)
      .exec((err, products) => {
          if (err) {
              return res.status(400).json({
                  error: "Accelerations not found"
              });
          }
          res.json(products);
      });
});



app.post('/addGeolocation', async function (req, res) {
  const body = req.body
  console.log(body)

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a geolocation',
    })
  }

  const geolocation = await Geolocation.create(body);
  if (!geolocation) {
    return res.status(400).json({ success: false, error: err })
  }

  geolocation
    .save()
    .then(( doc ) => {
      return res.status(201).json({
        success: true,
        id: geolocation._id,
        message: 'Geolocation created!',
        value: doc
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Geolocation not created!',
      })
    })
});

app.post('/addAcceleration', async function (req, res) {
  const body = req.body
  console.log(body);

  if ( !body ) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a acceleration',
    })
  }

  const acceleration = await Acceleration.create(body);
  if ( !acceleration ) {
    return res.status(400).json({ success: false, error: err })
  }

  acceleration
    .save()
    .then((doc) => {
      return res.status(201).json({
        success: true,
        id: acceleration._id,
        message: 'Acceleration created!',
        value: doc
      })
    })
    .catch(error => {
      return res.status(400).json({
        error,
        message: 'Acceleration not created!',
      })
    })

  // let accelX = req.body.data.accel.accelX
  // let accelY = req.body.data.accel.accelY
  // let accelZ = req.body.data.accel.accelZ
  // let temp = req.body.data.temp
  // let gyroX = req.body.data.gyro.gyroX
  // let gyroY = req.body.data.gyro.gyroY
  // let gyroZ = req.body.data.gyro.gyroZ
});

app.listen(port, '0.0.0.0', function () {
  console.log("Express server listening on port " + port);
});

module.exports = app;