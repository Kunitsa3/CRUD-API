import { app } from '../src/index';
import request from 'supertest';

afterAll(() => {
  app.close();
});

describe('endpoint testing', () => {
  it('get empty array of users', async () => {
    await request(app).get('/api/users').expect(200, []);
  });

  it('create new user', async () => {
    await request(app)
      .post('/api/users')
      .send('username=Maks&age=23&hobbies=Games')
      .expect(res => {
        res.body.id = 'some fixed id';
      })
      .expect(201, {
        id: 'some fixed id',
        username: 'Maks',
        age: '23',
        hobbies: 'Games',
      });
  });

  it('get array of created users', async () => {
    await request(app)
      .get('/api/users')
      .expect(res => {
        res.body[0].id = 'some fixed id';
      })
      .expect(200, [
        {
          id: 'some fixed id',
          username: 'Maks',
          age: '23',
          hobbies: 'Games',
        },
      ]);
  });
});

