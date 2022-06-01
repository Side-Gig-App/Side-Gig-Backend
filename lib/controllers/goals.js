const { Router } = require('express');
const Goal = require('../models/Goals');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
    
