var chai = require('chai');
var chaiHttp = require('chai-http');
var userService = require('../../services/userService');
var server = require('../../server');

var should = chai.should();
var expect = chai.expect;

var User = require('../../models/User')

chai.use(chaiHttp);

describe('Users module tests', () => {
    var token = null;

    //Initialize test getting the authentication token 
    before((done) => {
        chai.request(server)
        .post('/auth')
        .send({username:'jagomez', password:'p@$$w0rD'})
        .end((err,res) => {
            token = res.body.token;
            done();
        });
    });


    it('/GET Method should return a list of users', (done) => {
        chai.request(server)
        .get('/users')
        .set('authorization', 'Bearer '+token)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            done();
        });
    });

    it('/GET/:username Method should return a specific user', (done) => {
        chai.request(server)
        .get('/users/jagomez')
        .set('authorization', 'Bearer '+token)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.include({"name":"jagomez"});
            done();
        });
    });
});