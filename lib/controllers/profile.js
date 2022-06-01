const { Router } = require('express');
const Favorite = require('../models/Favorites');
const User = require('../models/Profile');
const UserService = require('../services/UserService');
const authenticate = require('../middleware/authenticate');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    try {
      res.send(req.user);
    } catch (error) {
      console.error(error);
    }
  })

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
  console.log(user, 'user .............>');

      res
        .cookie(process.env.COOKIE_NAME, user, {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
          secure: false,
          sameSite: 'strict'
          // secure & same-site (add these params; should both take boolean to see whether code is in production || development. SHould be able to store in GitHub secrets & envs to toggle)
        })
        .redirect('/api/v1/comparison');
    } catch (error) {
      next(error);
    }
  })

  .delete('/', (req, res) => {
    // clear cookies will take a second argument and this will be identical to the obj passed in on line 54 ( or the first res.cookie in the post ('/signin') route )
    res.clearCookie(process.env.COOKIE_NAME).json({
      success: true,
      message: 'Successfully signed Out of App',
    });
  });
