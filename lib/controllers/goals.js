const { Router } = require('express');
const Goal = require('../models/Goals');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try{
      console.log(req.body.goal_amount, req.body.goal_accomplished, 'goals --------------><');
      const goal = await Goal.insertGoal(
        req.user.profiles_id, req.body.goal_amount, req.body.goal_accomplished
      );
      res.json(goal);

    }catch(error){
      next(error);
    }
  })
  
  .patch('/', authenticate, async(req, res, next) => {
    try{
      const updatedGoal = await Goal.updateGoal(req.body.goal_id, req.user.profiles_id, req.body.goal_accomplished);

      res.send(updatedGoal); 

    }catch(error){
      next(error);
    }
  })

  .get('/', authenticate, async (req, res, next) => {
    try{
      const allGoals = await Goal.getAllGoals(req.user.profiles_id);

      res.send(allGoals);
    }catch(error){
      next(error);
    }
  })
;

