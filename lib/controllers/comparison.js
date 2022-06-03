const { Router } = require('express');
const Gig = require('../models/Comparison');
// const { apiFetch, apiFetch2 } = require('../services/apiFetch');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const gigs = await Gig.insert(
        req.body
      );

      await Gig.insertGigToFavorites({
        gig_id: gigs.gig_id,
        profiles_id: req.user.profiles_id,
      });

      res.json(gigs);
    } catch (error) {
      next(error);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try {
      const gigs = await Gig.getAllGigs();
      res.send(gigs);
    } catch (error) {
      next(error);
    }
  });
