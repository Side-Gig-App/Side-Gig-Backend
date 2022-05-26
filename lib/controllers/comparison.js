const { Router } = require('express');
const { apiFetch, apiFetch2 } = require('../services/apiFetch');


module.exports = Router() 

.get('/',  async (req, res, next) => {
  try {
    const gigInNeed = {
      gigName: 'uber',
      thirdPartyLink: 'https://www.uber.com/us/en/s/e/join/',
    };
    const hourlySalary = await apiFetch();
    res.json({...gigInNeed, hourlySalary })
  } catch (error) {
    next(error)
  }
})

