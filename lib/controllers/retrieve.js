const { Router } = require('express');
const { apiFetchForDriving } = require('../services/apiFetch');

module.exports = Router()

  .get('/', async (req, res) => {
    const response = await apiFetchForDriving();
    
    res.send(response);
  });



