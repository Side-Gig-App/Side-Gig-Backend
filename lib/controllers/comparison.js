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
      res.json({ ...gigInNeed, hourlySalary });
    } catch (error) {
      next(error);
    }
  })
  
  .post('/comparison', async (req, res, next) => {
    try {
      const gigs = await apiFetch.insert(req.body);
      console.log('GIIIGS', gigs);
      res.send(gigs);
    } catch (error) {
      next(error);
    }
  });

