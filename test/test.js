
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




lab.test('Test tge test', (done) => {


    server.inject({
        method :'get',
        url : '/dbnames'
    }, function(response ){
        Code.expect(response.statusCode).to.equal(200);
        console.log(response.payload)
        done()
    })

});
