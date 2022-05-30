const { Router } = require('express');
const Favorite = require('../models/Favorites');

module.exports = Router()

  .patch('/', async (req, res, next) => {
    try {
      // console.log('IM HIT!!! line 7');
      console.log('REQ>BODY', req.body.is_favorite);
      const favoriteGig = await Favorite.change(req.body.is_favorite, 'guy1');
      // console.log('||FavoriteGig||', favoriteGig);
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
