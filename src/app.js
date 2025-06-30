const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const contributorRouter = require('./routes/contributor');
const contributionRouter = require('./routes/contribution');
const contributionsRouter = require('./routes/contributions');
const clientRouter = require('./routes/client');
const authRouter = require('./routes/auth');
const intentionRouter = require('./routes/intention');
const printRouter = require('./routes/print');

const connection_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`

mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}
);

const db = mongoose.connection;
db.once('connected', function () {
  console.log('Connection is ok!');
});
db.on('error', console.error.bind(console, 'connection error:'));

let app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

let corsOptions = {
  origin: ['http://localhost:8080', 'https://cnsg.surge.sh'],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 200,
  preflightContinue: true
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions)); 
// app.use(cors({
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }));


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/contributor', contributorRouter);
app.use('/contribution', contributionRouter);
app.use('/contributions', contributionsRouter);
app.use('/intention', intentionRouter);
app.use('/client', clientRouter);
app.use('/print', printRouter);

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
  next();
});


app.use((err, req, res, next) => {
  if (err.status_code) {
    res.status(err.status_code).json(err.message);
  } else {
    res.status(500).json({
      message: err.message
    });
  }
});

module.exports = app;
