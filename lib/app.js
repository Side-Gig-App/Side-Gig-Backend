const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/proof', require('./controllers/retrieve'));
app.use('/api/v1/users', require('./controllers/profile'));
app.use('/api/v1/comparison', require('./controllers/comparison'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));


module.exports = app;
