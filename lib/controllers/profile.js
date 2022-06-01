const { Router } = require('express');
const Favorite = require('../models/Favorites');
const User = require('../models/Profile');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/favorites', async (req, res, next) => {
    try {
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  })

  .patch('/favorites', async (req, res, next) => {
    try {
      // res.send(req.body);
      const resp = Favorite.change(true, 1);
      
      res.json(resp);
    } catch (error) {
      next(error);
    }
  })

  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
    

      res.send(user);
    } catch (error) {
      next(error);
    }
  })

  .post('/signin', async (req, res, next) => {
    try {
      const user = await UserService.signIn(req.body);
  

      res
        .cookie(process.env.COOKIE_NAME, user, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .redirect('/api/v1/comparison');
    } catch (error) {
      next(error);
    }
  })

  .delete('/', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).json({
      success: true,
      message: 'Successfully signed Out of App',
    });
  });
