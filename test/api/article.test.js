const { expect } = require('chai');
const request = require('supertest');

const container = require('../../src/container');
const app = container.resolve('app');
const { auth }  = container.resolve('config');

const { ArticleDbModel } = require('../../src/infra/database/models/models');

describe('API Tests - Articles', () => {
  const _id = ArticleDbModel.generateId();
  const article = {
    title: 'Article one',
    text: 'This the first article',
    userId: '5d94a8f0ac6bbf00136e9d54',
    tags: ['test', 'first', 'example']
  };
  const data = Object.assign({}, article, {_id});

  before((done) => {
    app.start()
      .then(done())
      .catch(error => {
        app.logger.error(error.stack);
        done(error);
      });
  });

  afterEach(async () => {
    return await ArticleDbModel.deleteMany({});
  });

  describe('GET /api/articles', () => {
    const Article = new ArticleDbModel(data);

    beforeEach(async () => {
      return await Article.save();
    });

    it('Should return article list', (done) => {
      request(app.server.express)
        .get('/api/articles')
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
        .get('/api/articles')
        .expect('Content-Type', /json/)
        .expect(401)
        .end(done);
    });
  });

  describe('GET /api/articles/byTags', () => {
    const tags = article.tags.join(',');
    const Article = new ArticleDbModel(data);

    beforeEach(async () => {
      return await Article.save();
    });

    it('Should return article list by tags', (done) => {
      request(app.server.express)
        .get(`/api/articles/byTags/${tags}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .expect((res) => {
          const body = res.body;
          expect(body).to.be.an('array');
        })
        .end(done);
    });
  });

  describe('POST /api/articles', () => {
    it('Should create an user', (done) => {
      request(app.server.express)
        .post('/api/articles')
        .set('Authorization', `Bearer ${auth.token}`)
        .send(article)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => {
          const body = res.body;
          expect(body).to.be.an('object');
          expect(body).to.have.property('title', article.title);
          expect(body).to.have.property('text', article.text);
          expect(body).to.have.property('userId', article.userId);
          expect(body).to.have.property('tags').to.be.an('array');
          expect(body.tags).deep.equal(article.tags);
        })
        .end(done);
    });
  });

  describe('PUT /api/articles/{id}', () => {
    it('Should update an user', (done) => {
      request(app.server.express)
        .post('/api/articles')
        .set('Authorization', `Bearer ${auth.token}`)
        .send(article)
        .then((res) => {
          const articleToUpdate = res.body;
          articleToUpdate.title = 'Article updated';
          request(app.server.express)
            .put(`/api/articles/${articleToUpdate._id}`)
            .set('Authorization', `Bearer ${auth.token}`)
            .send(articleToUpdate)
            .then((res) => {
              const body = res.body;
              expect(body).to.be.an('object');
              expect(body).to.have.property('_id', articleToUpdate._id);
              expect(body).to.have.property('title', articleToUpdate.title);
              expect(body).to.have.property('text', articleToUpdate.text);
              expect(body).to.have.property('userId', articleToUpdate.userId);
              expect(body).to.have.property('tags').to.be.an('array');
              expect(body.tags).deep.equal(articleToUpdate.tags);
              done();
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });
  });

  describe('DELETE /api/articles/{id}', () => {
    it('Should delete an user', (done) => {
      request(app.server.express)
        .post('/api/articles')
        .set('Authorization', `Bearer ${auth.token}`)
        .send(article)
        .then((res) => {
          const articleToDelete = res.body;
          request(app.server.express)
            .delete(`/api/articles/${articleToDelete._id}`)
            .set('Authorization', `Bearer ${auth.token}`)
            .then((res) => {
              const body = res.body;
              expect(body).to.be.an('object');
              expect(body).to.have.property('_id', articleToDelete._id);
              expect(body).to.have.property('title', articleToDelete.title);
              expect(body).to.have.property('text', articleToDelete.text);
              expect(body).to.have.property('userId', articleToDelete.userId);
              expect(body).to.have.property('tags').to.be.an('array');
              expect(body.tags).deep.equal(articleToDelete.tags);
              done();
            })
            .catch(err => done(err));
        })
        .catch(err => done(err));
    });
  });
});
