const { expect } = require('chai');
const request = require('supertest');

const container = require('../../src/container');
const app = container.resolve('app');
const { auth }  = container.resolve('config');

const { UserDbModel } = require('../../src/infra/database/models/models');

describe('API Tests - Users', () => {
  const _id = UserDbModel.generateId();
  const user = {
    name: 'user one',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/6/67/User_Avatar.png'
  };
  const data = Object.assign({}, user, {_id});

  before((done) => {
    app.start()
      .then(done())
      .catch(error => {
        app.logger.error(error.stack);
        done(error);
      });
  });

  describe('GET /api/users', () => {
    const User = new UserDbModel(data);

    beforeEach(async () => {
      return await User.save();
    });

    afterEach(async () => {
      return await UserDbModel.deleteMany({});
    });

    it('Should return user list', (done) => {
      request(app.server.express)
        .get('/api/users')
        .set('Authorization', `Bearer ${auth.token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          const body = res.body;
          expect(body).to.be.an('array');
          expect(body[0]).to.have.property('_id', _id.toString());
        })
        .end(done);
    });

    it('Should return unauthorized', (done) => {
      request(app.server.express)
        .get('/api/users')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    });
  });

  describe('POST /api/user', () => {
    it('Should create an user', (done) => {
      request(app.server.express)
        .post('/api/users')
        .set('Authorization', `Bearer ${auth.token}`)
        .send(user)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => {
          const body = res.body;
          expect(body).to.be.an('object');
          expect(body).to.have.property('name', user.name);
          expect(body).to.have.property('avatar', user.avatar);
        })
        .end(done);
    });

    it('Should return badrequest 400', (done) => {
      const badUser = Object.assign(user);
      delete badUser.name;
      request(app.server.express)
        .post('/api/users')
        .set('Authorization', `Bearer ${auth.token}`)
        .send(badUser)
        .expect('Content-Type', /json/)
        .expect(400)
        .expect((res) => {
          const body = res.body;
          expect(body).to.be.an('object');
          expect(body).to.have.property('error');
        })
        .end(done);
    });
  });
});
