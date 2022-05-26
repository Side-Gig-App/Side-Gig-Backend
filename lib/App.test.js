const pool = require('../lib/utils/pool');
const UserService = require('../lib/services/UserService');
const request = require('supertest');
const setup = require('../data/setup');
const app = require('../lib/app');
const agent = request.agent(app);

describe('testing users', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
    
  it('signs in a user', async () => {
    const user = await UserService.create({
      email: 'guy1',
      password: '1235',
    });
    console.log(user);

    const res = await agent
      .post('/api/v1/users/sessions')
      .send({ ...user, password: '1235' });
    expect(res.body).toEqual({ message: 'You are Signed In' });
  });
});
