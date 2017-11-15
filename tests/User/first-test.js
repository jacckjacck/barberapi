var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var userService = require('../../services/userService');
var server = require('../../server');
var shourl = chai.should();

chai.use(chaiHttp);

describe('/GET Users', () => {
    var token = null;

    before((done) => {
        chai.request(server)
        .post('/auth')
        .send({username:'jagomez', password:'p@$$w0rD', cedula:1})
        .end((err,res) => {
            token = res.body.token;
            
            done();
        });
    });


    it('Get Method should return a list of users', (done) => {
        chai.request(server)
        .get('/users')
        .set('authorization', 'Bearer '+token)
        .end((err, res) => {
            res.should.to.have.status(200);
            res.body.should.to.be.a('array');
            done();
        });
    })
});