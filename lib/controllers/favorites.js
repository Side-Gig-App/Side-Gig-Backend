const { Router } = require('express');
const Favorite = require('../models/Favorites');
const authenticate = require('../middleware/authenticate');

module.exports = Router()

  .patch('/', authenticate, async (req, res, next) => {
    try {
      console.log('REQ>BODY', req.body.is_favorite);
      console.log('REQ>BODY gig id', req.body.gig_id);
      console.log('REQ>BODY user', req.user.profiles_id);

      const favoriteGig = await Favorite.change(req.body.is_favorite, req.user.profiles_id, req.body.gig_id);
      console.log('||FavoriteGig||', favoriteGig);
      res.send(favoriteGig);
    } catch (error) {
      next(error);
    }
  })
  
  .get('/', async (req, res, next) => {
    try {
      const resp = await Favorite.fetchFavorites();
      res.send(resp);
    } catch (error) {
      next(error);
    }
  });
