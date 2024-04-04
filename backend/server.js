const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routers/mainRouter');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eeplus_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));


const app = express();
app.use(cors());
app.use('/', router);




app.listen(8000, () => {
  console.log('Server running on http://localhost:8000');
});
