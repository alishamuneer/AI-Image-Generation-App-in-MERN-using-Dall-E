const createImageRoute = require('./routes/createImageRoute')
const saveImageRoute = require('./routes/shareImageRoute')
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config()
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/aiImageGen')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json({limit: '50mb'}));
app.use(cors());

app.use('/api', createImageRoute)
app.use('/api', saveImageRoute)


const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}...`));