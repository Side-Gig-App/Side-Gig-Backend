const { Router } = require('express');
const Favorite = require('../models/Favorites');
const authenticate = require('../middleware/authenticate');

module.exports = Router()

  .post('/', authenticate, async (req, res, next) => {
    try {
      console.log(req.user, ' req body line 9------');
      const favoriteGig = await Favorite.insert(req.body.is_favorite, req.user.profiles_id, req.body.gig_id);

      res.send(favoriteGig);
    } catch (error) {
      next(error);
    }
  })

  .patch('/', authenticate, async (req, res, next) => {
    try {
      console.log(req.user, ' req body line 9------');
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
  })
  .delete('/', authenticate, async (req, res, next) => {
    try {
      const resp = await Favorite.delete(req.body.gig_id);
      res.send(resp);
    } catch (error) {
      next(error);
    }
  });
