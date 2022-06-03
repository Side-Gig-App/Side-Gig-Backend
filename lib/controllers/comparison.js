const { Router } = require('express');
const Gig = require('../models/Comparison');
const {
  apiFetchForDriving,
  apiFetchForDrivingOther,
  apiFetchForTutoring,
  apiFetchForNannyAndChildServices,
  apiFetchForLandscape,
  apiFetchForDeliveryFoodService,
} = require('../services/apiFetch');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const gigs = await Gig.insert(req.body);

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
  })

  .post('/gigs', authenticate, async (req, res, next) => {
    try {
      // const gigs = await Gig.getAllGigs();
      const arr = [
        apiFetchForDriving,
        apiFetchForDrivingOther,
        apiFetchForTutoring,
        apiFetchForNannyAndChildServices,
        apiFetchForLandscape,
        apiFetchForDeliveryFoodService,
      ];
      // res.send(gigs);

      if (req.body.gig_name === 'uber') {
        res.send(arr[0]);
      }

      if (req.body.gig_name === 'lyft') {
        res.send(arr[1]);
      }

      if (req.body.gig_name === 'tutor') {
        res.send(arr[2]);
      }

      if (req.body.gig_name === 'nanny') {
        res.send(arr[3]);
      }

      if (req.body.gig_name === 'lawn') {
        res.send(arr[4]);
      }

      if (req.body.gig_name === 'doordash' || req.body.gig_name === 'grubhub') {
        res.send(arr[5]);
      }

    } catch (error) {
      next(error);
    }
  });
