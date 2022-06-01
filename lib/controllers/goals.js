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
  })
  
  .patch('/', authenticate, async(req, res, next) => {
    try{
     console.log(req.body, '---updated goal');

      const updatedGoal = await Goal.updateGoal(req.body.goal_id, req.user.profiles_id, req.body.goal_accomplished);

      res.send(updatedGoal); 
    //   console.log(updatedGoal, '---updated goal');
    }catch(error){
      next(error);
    }
  })
;

