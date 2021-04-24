const expect = require('expect');
const request = require('supertest');
const app = require('../app.js');

describe('get /search', () => {
    it('should get all movies', (done) => {
      request(app)
        .get('/API/v1/stockbit/movie/search')
        .query({
            keyword: 'batman',
            page: 1
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.length).toBeGreaterThan(0)
        })
        .end(done);
    })
  });

  describe('get /search without keyword', () => {
    it('should return false if no keyword', (done) => {
      request(app)
        .get('/API/v1/stockbit/movie/search')
        .expect(400)
        .end(done);
    })
  });

  describe('get /detail', () => {
    it('should get detail movie', (done) => {
      request(app)
        .get('/API/v1/stockbit/movie/detail')
        .query({
            imdbID: 'tt0103359'
        })
        .expect(200)
        .expect((res) => {
          expect.objectContaining('data')
        })
        .end(done);
    })
  });

  describe('get /detail without imdb id', () => {
    it('should get detail movie', (done) => {
      request(app)
        .get('/API/v1/stockbit/movie/detail')
        .expect(400)
        .end(done);
    })
  });
