var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../app');
var should = chai.should();
var path = require('path');
var jsoner = require('duckdoc-jsoner');

jsoner.outputPath = path.join(__dirname, '../doc/json');
chai.use(chaiHttp)

let api = {
  method: "??",
  url   : "https://??",
  req   : {
    headers: {},
    body   : {}
  },
  res   : {
    status: {
      code   : 10000,
      message: "????"
    },
    body  : {}
  }
};

describe('duckdoc-example', () => {
  describe('/GET duck', () => {
    it('it should GET a duck', (done) => {
      chai.request(app)
        .get('/duck')
        .end((err, res) => {
          res.should.have.status(200);

          let theApi = Object.assign({}, api, {
            method: "GET",
            url   : "https://localhost:3000/duck",
            req   : {
              headers: res.request.header
            },
            res   : {
              status: {
                code   : res.statusCode,
                message: "OK"
              },
              body  : JSON.stringify(res.body)
            }
          })
          jsoner.createFromAPI(theApi);

          done();
        });
    });
  });

  describe('/POST duck/alwaysSuccessPost', () => {
    it('it should always succeed', (done) => {

      let reqBody = {
        "hello": "I am",
        "a": "duck"
      };

      chai.request(app)
        .post('/duck/alwaysSuccessPost')
        .send(reqBody)
        .end((err, res) => {
          res.should.have.status(200);

          let theApi = Object.assign({}, api, {
            method: "POST",
            url   : "https://localhost:3000/duck/alwaysSuccessPost",
            req   : {
              headers: res.request.header,
              body: reqBody
            },
            res   : {
              status: {
                code   : res.statusCode,
                message: "OK"
              },
              body  : JSON.stringify(res.body)
            }
          })
          jsoner.createFromAPI(theApi);

          done();
        });
    });
  });
});