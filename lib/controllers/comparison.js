const { Router } = require('express');
const Gig = require('../models/Comparison');
const { apiFetch, apiFetch2 } = require('../services/apiFetch');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      console.log('line 34');
      const gigs = await Gig.insert(
        req.body
        // gig_name: 'pie',
        // third_party_link: 'link',
        // salary_hourly: '25',
      );
      console.log('GIIIGS 36', gigs);
      res.send(gigs);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    // try {
    //   const gigInNeed = {
    //     gigName: 'uber',
    //     thirdPartyLink: 'https://www.uber.com/us/en/s/e/join/',
    //   };
    //   const hourlySalary = await apiFetch();

    //   res.json({ ...gigInNeed, hourlySalary });
    // } catch (error) {
    //   next(error);
    // }
    try {
      console.log('line 22');
      const gigs = await Gig.getAllGigs();
      console.log('GIIIGS', gigs);
      res.send(gigs);
    } catch (error) {
      next(error);
    }
  });
