import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
  // ################## Before helper fct implementation
  // const authResponse = await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email: 'test@test.com',
  //     password: 'password',
  //   })
  //   .expect(201);
  // const cookie = authResponse.get('Set-Cookie');
  // ################## After helper fct implementation
  const cookie = await signin();
  // ###########""
  // here we have a problem because the cookie is not managed
  // and will not be send with the follow up request
  //   so we have to send it manually
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send()
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
