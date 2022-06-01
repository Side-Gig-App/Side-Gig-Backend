const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
const Gig = require('../lib/models/Comparison');
const { insertGigToFavorites } = require('../lib/models/Comparison');
const Favorite = require('../lib/models/Favorites');
const Goal = require('../lib/models/Goals');




describe('Side-Gig-Backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  
  afterAll(() => {
    pool.end();
  });

  it('inserts a goal into the goals table', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'guy1',
      password: '123456',
    });
  
    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    const res = await agent
      .post('/api/v1/goals')
      .send({ 
        // goal_id:'1', 
        profiles_id:'1', 
        goal_amount:'100', goal_accomplished:'false' });
 
    const insertedGoal = {
    //   goal_id:'1', 
      profiles_id:1, 
      goal_amount:100, goal_accomplished:false 

    };

    expect(res.body).toEqual({ ...insertedGoal, goal_id: expect.any(String) });

  });

  it.only('updates a goal to accomplished', async() => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'guy1',
      password: '123456',
    });
  
    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    await agent
      .post('/api/v1/goals')
      .send({ 
        profiles_id:'1', 
        goal_amount:'100', goal_accomplished:'false'
      });

    const res = await agent
      .patch('/api/v1/goals')
      .send({ 
        profiles_id:'1', 
        goal_amount:'100', goal_accomplished:'true',
        goal_id:'1'
      });

    expect(res.body).toEqual({
      profiles_id:1, 
      goal_amount:100, goal_accomplished:true,
      goal_id:'1'
    });
  });

  it('gets a list of goals for a user', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'guy1',
      password: '123456',
    });
  
    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    await agent
      .post('/api/v1/goals')
      .send({ 
        profiles_id:'1', 
        goal_amount:'100', goal_accomplished:'false'
      });
    const res =  await agent
      .post('/api/v1/goals')
      .send([{ 
        profiles_id:'1', 
        goal_amount:'120', goal_accomplished:'false'
      },
      {
        profiles_id:'1', 
        goal_amount:'120', goal_accomplished:'false'

      }
      ]);

    expect(res.body).toEqual([
      {
        profiles_id:'1', 
        goal_amount:'100', goal_accomplished:'false' }
      ,
      {
        profiles_id:'1', 
        goal_amount:'120', goal_accomplished:'false'

      }
    ]);
  },
  );


});
