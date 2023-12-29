import { ProductModel, UserModel } from '../../../../src/data';
import { TestDatabase } from '../../../test-database';
import { testServer } from '../../../test-server';
import request from 'supertest';

describe('Api tags routes testing', () => {
  afterAll(async () => {
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    testServer.close();
    TestDatabase.close();
  });

  afterEach(async () => {
    await ProductModel.deleteMany();
    await UserModel.deleteMany();
  });

  beforeAll(async () => {
    await testServer.start();
    await TestDatabase.start();
  });

  test('should return an Array of unique tags', async () => {
    const user = {
      name: 'test',
      email: 'test@example.com',
      password: 'M5e5k5i57.',
    };

    const createdUser = await UserModel.create(user);

    const product1 = {
      name: 'Product 1',
      price: 1,
      tags: ['motor', 'work'],
      image: '',
      createdBy: createdUser.id,
    };

    const product2 = {
      name: 'Product 2',
      price: 2,
      tags: ['lifestyle', 'motor'],
      image: '',
      createdBy: createdUser.id,
    };

    await ProductModel.insertMany([product1, product2]);

    const { body } = await request(testServer.app)
      .get('/api/v1/tags')
      .expect(200);

    expect(body).toEqual(['motor', 'work', 'lifestyle']);
  });
});
