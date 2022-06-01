const { Router } = require('express');
const Goal = require('../models/Goals');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      const goal = await Goal.insertGoal(
        req.body
      );
      res.json(goal);

    }catch(error){
      next(error);
    }
  });

