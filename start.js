require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 

const applicationRouter = require('./configurations/routes.config');
const errorHandler = require('./configurations/error.config')

const app = express();

app.use(bodyParser.json());
app.use('/api/v1', applicationRouter);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
}).then(() => {
  
  console.log('-- connected to mongodb --');
  
  // start server only when mongodb is connected
  app.listen(process.env.PORT, () => {
    console.log(`swadeshi sahayak server is running on ${process.env.PORT}`);
  });

})  
.catch(error => {
  console.error('error while connecting to mongodb:', error);

  console.log('server was shut down');
});

