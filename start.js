require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const applicationRouter = require('./configurations/routes')
const mongoose = require('mongoose'); 

const app = express();

app.use(bodyParser.json());
app.use('/api/v1', applicationRouter);

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

