const { Router } = require('express');
const Favorite = require('../models/Favorites');
const authenticate = require('../middleware/authenticate');

module.exports = Router()

  .patch('/', authenticate, async (req, res, next) => {
    try {
     
      const favoriteGig = await Favorite.change(req.body.is_favorite, req.user.profiles_id, req.body.gig_id);

      res.send(favoriteGig);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/', authenticate, async (req, res, next) => {
    try {
      const resp = await Favorite.fetchFavByProfileID(req.user.profiles_id);
      res.send(resp);
    } catch (error) {
      next(error);
    }
  });
