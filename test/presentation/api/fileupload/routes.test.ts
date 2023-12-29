import { ProductModel, UserModel } from '../../../../src/data';
import { TestDatabase } from '../../../test-database';
import { testServer } from '../../../test-server';
import path from 'path';
import request from 'supertest';

describe('Api fileupload routes testing', () => {
  const loginRoute = '/api/v1/auth/login';
  const uploadRoute = '/api/v1/upload';

  const getTokenCookie = async () => {
    await UserModel.create({
      name: 'Tester',
      email: 'test@example.com',
      password: 'M5e5k5i57.',
    });

    const loginResponse = await request(testServer.app).post(loginRoute).send({
      email: 'test@example.com',
      password: 'M5e5k5i57.',
    });

    const tokenCookie = loginResponse.headers['set-cookie'];

    return tokenCookie;
  };

  afterAll(async () => {
    await UserModel.deleteMany();
    await ProductModel.deleteMany();
    testServer.close();
    TestDatabase.close();
  });

  afterEach(async () => {
    await ProductModel.deleteMany();
  });

  beforeAll(async () => {
    await testServer.start();
    await TestDatabase.start();
  });

  test('should return single uploaded image name', async () => {
    const token = await getTokenCookie();
    const filePath = path.join(__dirname, 'images', 'test_image.jpg');
    console.log({ filePath });

    const { body } = await request(testServer.app)
      .post(`${uploadRoute}/single/products`)
      .set('Cookie', token)
      .attach('file', `${filePath}`)
      .expect(200);

    expect(body).toEqual({
      fileName: expect.any(String),
    });
  });
});
