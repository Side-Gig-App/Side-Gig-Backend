const { Router } = require('express');
const Gig = require('../models/Comparison');
const User = require('../models/Profile');
const { apiFetch, apiFetch2 } = require('../services/apiFetch');
const authenticate = require('../middleware/authenticate');


module.exports = Router()
  .post('/', authenticate,  async (req, res, next) => {
    try {
      // console.log('line 34');
      // const email = User.findByEmail(
        
      // )
    

      // const profilesId = req.body.profiles_id;

      // console.log(profilesId, 'profilessssss iddddd');
      const gigs = await Gig.insert(
        req.body
        
        // gig_name: 'pie',
        // third_party_link: 'link',
        // salary_hourly: '25',
      );
    
      const favoriteGigs = await Gig.insertGigToFavorites({
        gig_id: gigs.gig_id, profiles_id: req.user.profiles_id }
      );
    
   
   
      // console.log('GIIIGS 36', gigs);
      // const specificGig = await Gig.fetchGigId(1);
      // console.log('specificGig should return a non null value :>> ', specificGig);

      res.json(gigs);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      // console.log('line 22');
      const gigs = await Gig.getAllGigs();
      // console.log('GIIIGS', gigs);
      res.send(gigs);
    } catch (error) {
      next(error);
    }
  });
