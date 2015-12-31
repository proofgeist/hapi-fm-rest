"use strict";

const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const fmsjsonapi = require('../plugin')


var Hapi = require("hapi");
var server = new Hapi.Server();
server.connection({port : 8080});

lab.before(function(done){
    server.register(fmsjsonapi, done )
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
        url : '/dbnames?-max=1'
    };

    commonTests(request)

});

lab.experiment('GET /{db}/layoutnames', ()=>{
    let request = {
        method :'get',
        url : '/ContactsTest/layoutnames'
    };

    commonTests(request)

});

lab.experiment('GET /{db}/scriptnames', ()=>{
    let request = {
        method :'get',
        url : '/ContactsTest/scriptnames'
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




