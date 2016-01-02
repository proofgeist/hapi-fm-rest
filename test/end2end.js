"use strict";

const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const fmsjsonapi = require('../plugin');

const PORT = process.env.PORT ? process.env.PORT : 3000;
const FMS_SERVER_ADDRESS = process.env.FMS_SERVER_ADDRESS ? process.env.FMS_SERVER_ADDRESS : 'localhost';

const Hapi = require("hapi");
const server = new Hapi.Server();

const internals = {};

internals.basicAuthHeader = function (username, password) {
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};


server.connection({port : PORT });
lab.before(function(done){
    server.register({
        register: fmsjsonapi,
        options: {fmsAddress : FMS_SERVER_ADDRESS}
    },
        done
    )

});

const commonTests = (request)=>{
    lab.test('should return status code 200 and error "0"', (done) => {
        server.inject(request, function(response ){
            Code.expect(response.statusCode).to.equal(200);
            let data = JSON.parse(response.payload);
            Code.expect(data.error).to.equal('0');
            done()
        })
    });
};


lab.experiment('GET /dbnames',{timeout:5000}, ()=>{
    let request = {
        method :'get',
        url : '/dbnames?-max=1',
        headers : {
            authorization : internals.basicAuthHeader('admin', '')
        }
    };

    commonTests(request)

});

lab.experiment('GET /{db}/layoutnames', ()=>{
    let request = {
        method :'get',
        url : '/ContactsTest/layoutnames',
        headers : {
            authorization : internals.basicAuthHeader('admin', '')
        }
    };

    commonTests(request)

});

lab.experiment('GET /{db}/scriptnames', ()=>{
    let request = {
        method :'get',
        url : '/ContactsTest/scriptnames',
        headers : {
            authorization : internals.basicAuthHeader('admin', '')
        }
    };

    commonTests(request)

});

/*
we start this test with a max and larger timeout so that it will complete.
 */
lab.experiment('GET /{db}/{layout}',{timeout:5000}, ()=>{
    let request = {
        method :'get',
        url : '/ContactsTest/Contacts?-max=2',
        headers : {
            authorization : internals.basicAuthHeader('admin', '')
        }
    };

    lab.test('should return status code 200 and error "0"', (done) => {
        server.inject(request, function(response ){
            Code.expect(response.statusCode).to.equal(200);
            let data = JSON.parse(response.payload);
            Code.expect(data.error).to.equal('0');
            done()
        })
    });

});