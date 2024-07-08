import request from 'supertest';
import { ExpressApp as app } from '../../app';
import database from '../../database';

describe('/api/v1/authentication/user/access-token', () => {
  it('Should return error if user not exist', async () => {
    const response = await request(new app().getApp())
      .post('/api/v1/authentication/user/access-token')
      .send({
        email: 'userNotExist@gmail.com',
        password: '20304050',
      });

    expect(response.status).toEqual(404);
    expect(response.body.message).toBe('User does not exists');
  });

  afterAll(async () => {
    await database.close();
  });
});
