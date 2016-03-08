"use strict";

const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();
const Req = require('request');
const fmsjsonapi = require('../plugin');
const Hapi = require("hapi");

const PORT = process.env.PORT ? process.env.PORT : 3000;
const FMS_SERVER_ADDRESS = process.env.FMS_SERVER_ADDRESS ? process.env.FMS_SERVER_ADDRESS : 'localhost';

// declare internals object
const internals = {};
internals.basicAuthHeader =  (username, password) => {
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};
/**
 * used to run the data reset script in the test DB
 * @param cb
 */
internals.resetDB = (cb) =>{
    let url = 'https://' + FMS_SERVER_ADDRESS + '/fmi/xml/fmresultset.xml?-db=ContactsTest&-lay=userTable&-script=ResetForTest&-findany'
    Req({
        method: 'GET',
        uri : url,
        strictSSL : false,
        auth : {
            username : 'admin',
            password : 'e7z(CDYd*4MBRi'
        }

    }, (err, response, data)=>{

        if(err){
            throw err
        }
        cb(null)
    })
};

/**
 * setup the Hapi server
 */
const server = new Hapi.Server();
server.connection({port : PORT });
lab.before(function(done){
    // register the plugin
    server.register({
        register: fmsjsonapi,
        options: {
            fmsAddress : FMS_SERVER_ADDRESS,
            idField : 'id'
        }
    },
        ()=>{
            internals.resetDB(done)
        }

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
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
        }
    };

    commonTests(request)

});

lab.experiment('GET /{db}/layoutnames', ()=>{
    let request = {
        method :'get',
        url : '/ContactsTest/layoutnames',
        headers : {
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
        }
    };

    commonTests(request)

});

lab.experiment('GET /{db}/scriptnames', ()=>{
    let request = {
        method :'get',
        url : '/ContactsTest/scriptnames',
        headers : {
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
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
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
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


lab.experiment('POST /{db}/{layout}/',{timeout:2000}, ()=>{
    let request = {
        method :'POST',
        url : '/ContactsTest/userTable',
        headers : {
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
        },
        payload: {
            first_name : 'ok'
        }
    };

    lab.test('should return status code 201,error="0", and a location header', (done) => {
        server.inject(request, function(response ){
            Code.expect(response.statusCode).to.equal(201);
            let data = JSON.parse(response.payload);
            Code.expect(data.error).to.equal('0');
            Code.expect(response.headers.location).to.be.a.string()
            done()
        })
    });
});



lab.experiment('PATCH /{db}/{layout}/{id}',{timeout:50000}, ()=>{
    let request = {
        method :'PATCH',
        url : '/ContactsTest/userTable/1',
        headers : {
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
        },
        payload: {
            first_name : 'Steve'
        }
    };

    lab.test('Should return the same record with the first_name updated', (done) => {
        server.inject(request, function(response ){
            Code.expect(response.statusCode).to.equal(200);
            let data = JSON.parse(response.payload);
            Code.expect(data.data[0]['first_name']).to.equal('Steve');
            Code.expect(data.data[0]['id']).to.equal("1");
            done()
        })
    });
});

lab.experiment('PUT /{db}/{layout}/{id}',{timeout:50000}, ()=>{
    let request = {
        method :'PUT',
        url : '/ContactsTest/userTable/1',
        headers : {
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
        },
        payload: {
            first_name : 'Bill'
        }
    };

    lab.test('Should return the same record with the first_name updated', (done) => {
        server.inject(request, function(response ){
            Code.expect(response.statusCode).to.equal(200);
            let data = JSON.parse(response.payload);
            Code.expect(data.data[0]['first_name']).to.equal('Bill');
            Code.expect(data.data[0]['id']).to.equal("1");
            done()
        })
    });
});


lab.experiment('DELETE /{db}/{layout}/{id}',{timeout:50000}, ()=>{
    let request = {
        method :'DELETE',
        url : '/ContactsTest/userTable/2',
        headers : {
            authorization : internals.basicAuthHeader('admin', 'e7z(CDYd*4MBRi')
        }
    };

    lab.test('Should return 200', (done) => {
        server.inject(request, function(response ){
            Code.expect(response.statusCode).to.equal(200);
            done()
        })
    });
});