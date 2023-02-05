import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

// Global declaration for helper fct adding additionnal property signin which is a fct
// fct signature
declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
//Before all tests
beforeAll(async () => {
  // Not the best way but we set the env.variable for the token here
  process.env.JWT_KEY = 'asdf';
  // startup mongodb server and connect to mongoose
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

// Clear the DB before every test
beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// Closing the connection after the tests
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// A helper fct that will deal with the signin
global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
