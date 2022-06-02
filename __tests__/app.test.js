const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
// const Gig = require('../lib/models/Comparison');
// const { insertGigToFavorites } = require('../lib/models/Comparison');
const Favorite = require('../lib/models/Favorites');

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
    expect(res.body).toEqual({ ...user, profiles_id: expect.any(String) });
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

  it('displays gigs table', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'guy1',
      password: '123456',
    });
    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    const res = await agent.post('/api/v1/comparison').send({
      gig_name: 'uber',
      third_party_link: 'https://www.uber.com/us/en/s/e/join/',
      salary_hourly: '23.83',
    });
    // .send([{ 'gig_id': '1', 'gig_name': 'uber', 'salary_hourly': 25, 'third_party_link': 'link' }, { 'gig_id': '2', 'gig_name': 'lawn', 'salary_hourly': 22, 'third_party_link': 'here' }]);

    // const res = await agent.get('/api/v1/comparison');

    const gigInNeed = {
      gig_name: 'uber',
      third_party_link: 'https://www.uber.com/us/en/s/e/join/',
      salary_hourly: '23.83',
    };

    expect(res.body).toEqual({ ...gigInNeed, gig_id: expect.any(String) });
  });

  it('should fetch a list of gigs from gigs table', async () => {
    const agent = request.agent(app);

    await UserService.create({
      email: 'guy1',
      password: '123456',
    });

    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    await agent.post('/api/v1/comparison').send({
      gig_name: 'uber',
      third_party_link: 'https://www.uber.com/us/en/s/e/join/',
      salary_hourly: '23.83',
    });
    await agent.post('/api/v1/comparison').send({
      gig_name: 'lawn',
      third_party_link: 'https://www.uber.com',
      salary_hourly: '200',
    });

    // await agent
    //   .post('/api/v1/comparison')
    //   .send({
    //     gigName: 'lawn',
    //     thirdPartyLink: 'https://www.uber.com',
    //     hourlySalary: '200',
    //   });

    // const res = await agent
    // .get('/api/v1/comparison');

    const res = await agent.get('/api/v1/comparison');

    // console.log('TEST', res.body);

    expect(res.body).toEqual([
      {
        gig_name: 'uber',
        third_party_link: 'https://www.uber.com/us/en/s/e/join/',
        salary_hourly: '23.83',
        gig_id: expect.any(String),
      },
      {
        gig_name: 'lawn',
        third_party_link: 'https://www.uber.com',
        salary_hourly: '200',
        gig_id: expect.any(String),
      },
    ]);
  });

  it('gives us a list of user favorites gigs', async () => {
    // const agent = request.agent(app);

    // const newUser = await UserService.create({
    //   email: 'guy1',
    //   password: '123456',
    // });
    // const user = await agent
    //   .post('/api/v1/users/signin')
    //   .send({ email: 'guy1', password: '123456' });

    // //  post gigs to DB
    // await agent.post('/api/v1/comparison').send({
    //   gig_name: 'uber',
    //   third_party_link: 'https://www.uber.com/us/en/s/e/join/',
    //   salary_hourly: '23.83',
    //   profiles_id: newUser.profiles_id,
    // });

    const agent = request.agent(app);
    // const favoriteGigs = await Gig.insertGigToFavorites({
    //   gig_id:'1'
    // });

    const newUser = await UserService.create({
      email: 'guy1',
      password: '123456',
    });

    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    //  post gigs to DB
    await agent.post('/api/v1/comparison').send({
      gig_name: 'uber',
      third_party_link: 'https://www.uber.com/us/en/s/e/join/',
      salary_hourly: '23.83',
      profiles_id: newUser.profiles_id,
    });

    // await agent.post('/api/v1/comparison').send({
    //   gig_name: 'uber',
    //   third_party_link: 'https://www.uber.com/us/en/s/e/join/',
    //   salary_hourly: '23.83',
    //   // profiles_id: '1',
    // });

    // await agent
    //   .post('/api/v1/comparison')
    //   .send({
    //     gig_name: 'lawn',
    //     third_party_link: 'https://www.uber.com',
    //     salary_hourly: '200',
    //   });

    // await Gig.insert(
    //   {
    //     gig_name: 'pie',
    //     third_party_link: 'link',
    //     salary_hourly: '25',
    //   }
    // );

    // console.log('165User', user);
    const res = await agent.patch('/api/v1/favorites').send({
      is_favorite: true,
      gig_id: '1',
      // favorite_id: 1,
    });

    expect(res.body).toEqual({
      is_favorite: true,
      gig_id: '1',
      profiles_id: '1',
    });
  });

  it('adds the gigs id and profiles id to the favorites table', async () => {
    const agent = request.agent(app);
    // const favoriteGigs = await Gig.insertGigToFavorites({
    //   gig_id:'1'
    // });

    const newUser = await UserService.create({
      email: 'guy1',
      password: '123456',
    });

    await agent
      .post('/api/v1/users/signin')
      .send({ email: 'guy1', password: '123456' });

    //  post gigs to DB
    const res = await agent.post('/api/v1/comparison').send({
      gig_name: 'uber',
      third_party_link: 'https://www.uber.com/us/en/s/e/join/',
      salary_hourly: '23.83',
      profiles_id: newUser.profiles_id,
    });

    const fav = await Favorite.fetchFavByProfileID(newUser.profiles_id);

    expect(fav).toEqual([
      new Favorite({
        gig_id: '1',
        is_favorite: false,
        profiles_id: '1',
      }),
    ]);

    expect(res.body).toEqual({
      gig_id: '1',
      gig_name: 'uber',
      third_party_link: 'https://www.uber.com/us/en/s/e/join/',
      salary_hourly: '23.83',
      // profiles_id: expect.any(String)
    });
  });
});
