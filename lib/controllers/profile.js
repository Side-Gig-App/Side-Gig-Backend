const { Router } = require('express');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

module.exports = Router()
  .post('/signup', async  (req, res, next) => {
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
          maxAge: ONE_DAY_IN_MS
        })
        .redirect('/api/v1/comparison');

    } catch(error) {
      next(error);
    }
  })

  .delete('/', (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME).json({
      success: true,
      message: 'Successfully signed Out of App'

    });
  })
;

