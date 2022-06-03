const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ 
  // when deployed add / change origin, which will be deployed heroku site
  origin: ['http://localhost:7891', 'https://spiffy-sunflower-dadf5b.netlify.app'],
  credentials: true
    
}));


// App routes
app.use('/api/v1/proof', require('./controllers/retrieve'));
app.use('/api/v1/users', require('./controllers/profile'));
app.use('/api/v1/favorites', require('./controllers/favorites'));
app.use('/api/v1/comparison', require('./controllers/comparison'));
app.use('/api/v1/goals', require('./controllers/goals'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
