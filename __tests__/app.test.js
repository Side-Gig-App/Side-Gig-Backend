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

  it('signs in a user', async () => {
    const agent = request.agent(app);
    const user = await UserService.create({
      email: 'guy1',
      password: '123456',
    });
    console.log(user);

    const res = await agent
      .post('/api/v1/users/sessions')
      .send({ email: 'guy1', password: '123456' });
    expect(res.body).toEqual({ ...user, profiles_id: '2' });
  });
});


