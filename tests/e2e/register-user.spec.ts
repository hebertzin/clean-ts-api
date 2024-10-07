import request from 'supertest';
import { ExpressApp as app } from '../../app';
import mongoose from 'mongoose';

describe('/api/v1/authentication/user/register', () => {
  let userId;

  it('Should return error if user already exists', async () => {
    const response = await request(new app().getApp())
      .post('/api/v1/authentication/user/register')
      .send({
        name: 'hebert santos',
        email: 'hebertsantosdeveloper@gmail.com',
        password: '20304050',
      });

    expect(response.status).toEqual(209);
    expect(response.body.message).toBe('User already exists');
  });

  it('Should create a user correctly', async () => {
    const response = await request(new app().getApp())
      .post('/api/v1/authentication/user/register')
      .send({
        name: 'Hebert',
        email: 'hebertsantos0704@gmail.com',
        password: '20304050',
      });

    expect(response.status).toEqual(201);

    userId = response.body._id;
  });

  afterAll(async () => {
    if (userId) {
      await mongoose.connection.collection('users').deleteOne({ _id: userId });
    }
    await mongoose.disconnect();
  });
});
