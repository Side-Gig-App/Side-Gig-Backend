const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
// const { agent } = require('supertest');




describe('Side-Gig-Backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('signs up a user', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({
      email: 'guy1',
      password: '123456',
    });
  

    const res = await agent
      .post('/api/v1/users/signup')
      .send({ email: 'guy1', password: '123456' });
    expect(res.body).toEqual({ ...user, profiles_id: '2' });
  });

  it('should sign in a user', async () => {
    const agent = request.agent(app);

    const user = await UserService.create({
      email: 'guy1',
      password: '123456',
    });

    const { email } = user;

    const res = await agent
      .post('/api/v1/users/signin')
      .send({ email, password: '123456' })
      .redirects(1);
  
    expect(res.req.path).toEqual('/api/v1/comparison');

  });

  it('signs out a user', async () => {
    const user = await UserService.create({
      email: 'guy1',
      password: '123456',
    });
    const agent = request.agent(app);

    await agent 
      .post('/api/v1/users/signin')
      .send({ email: user.email, password: '123456' })
      .redirects(1);

    const res = await agent.delete('/api/v1/users');

    expect(res.body).toEqual({
      success: true,
      message: 'Successfully signed Out of App',
    });
    expect(res.status).toEqual(200);
  });
});


