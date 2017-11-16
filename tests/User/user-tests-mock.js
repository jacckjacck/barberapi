var chai = require('chai');
var userService = require('../../services/userService');
var server = require('../../server');

var sinon = require('sinon');

var mongoose = require('mongoose');
require('sinon-mongoose');

var should = chai.should();
var expect = chai.expect;

var UserService = require('../../services/userService')


describe('Users module tests using Mocks', () => {


    it('/GET Method should return a list of users', (done) => {
        var UserServiceMock = sinon.mock(UserService);
        var expectedResult = [{username: 'jagomez'},{username: 'jacckjacck'}];
        UserServiceMock.expects('GetUsers').yields(null, expectedResult);

        UserService.GetUsers((err, res)=>{
            UserServiceMock.verify();
            UserServiceMock.restore();
            expect(res).to.deep.include({username: 'jagomez'});
            expect(res).to.be.an('array');
            done();
        });
    });
});