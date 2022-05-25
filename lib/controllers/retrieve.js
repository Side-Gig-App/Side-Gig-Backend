const { Router } = require('express');
const { apiFetch } = require('../services/apiFetch');
// const apiFetch = require('../services/apiFetch');





module.exports = Router()

  .get('/', async (req, res) => {
    const response = await apiFetch();
    
    res.send(response);
  });



