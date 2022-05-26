const { Router } = require('express');
const UserService = require('../services/UserService');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      console.log('USER||', user);
      res.send(user);
    } catch (error) {
      next(error);
    }
  });

