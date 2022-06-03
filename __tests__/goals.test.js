const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

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

    const res = await agent.post('/api/v1/goals').send({
      profiles_id: '1',
      goal_amount: '100',
      goal_accomplished: 'false',
    });

    const insertedGoal = {
      profiles_id: 1,
      goal_amount: 100,
      goal_accomplished: false,
    };

    expect(res.body).toEqual({ ...insertedGoal, goal_id: expect.any(String) });
  });

  it('updates a goal to accomplished', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'guy1',
      password: '123456',
    });

    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    await agent.post('/api/v1/goals').send({
      profiles_id: '1',
      goal_amount: '100',
      goal_accomplished: 'false',
    });

    const res = await agent.patch('/api/v1/goals').send({
      profiles_id: '1',
      goal_amount: '100',
      goal_accomplished: 'true',
      goal_id: '1',
    });

    expect(res.body).toEqual({
      profiles_id: 1,
      goal_amount: 100,
      goal_accomplished: true,
      goal_id: '1',
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

    await agent.post('/api/v1/goals').send({
      goal_amount: 100,
      goal_accomplished: false,
    });
    await agent.post('/api/v1/goals').send({
      goal_amount: 120,
      goal_accomplished: false,
    });
    
    const res = await agent.get('/api/v1/goals');
    expect(res.body).toEqual([
      {
        profiles_id: 1,
        goal_id:'1',
        goal_amount: 100,
        goal_accomplished: false,
      },
      {
        profiles_id: 1,
        goal_id:'2',
        goal_amount: 120,
        goal_accomplished: false,
      },
    ]);
  });
});
