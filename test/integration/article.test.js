const { expect } = require('chai');
const request = require('supertest');

const container = require('../../src/container');
const app = container.resolve('app');
const { auth }  = container.resolve('config');

const { ArticleDbModel } = require('../../src/infra/database/models/models');

describe('Integration tests - Articles', () => {
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
});
