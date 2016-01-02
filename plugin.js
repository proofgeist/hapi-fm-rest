'use strict'

const handlers = require('./lib/handlers');
const client = require('./lib/FMServerClient/index');
const Basic = require('hapi-auth-basic');

const validate = (request, username, password, callback)=>{
    if (!username){
        return callback(null, false)
    }
    // since we aren't doing any validation here, we just need to return true
    // actual authentication will happen in the request to the fmServer
    callback(null, true, {username: username, password : password})

};

const routes = [
    {
        method: 'Get',
        path: '/',
        handler: function (request, reply) {
            reply('Hello, world!');
        }
    },
    {
        method : 'GET',
        path : '/dbnames',
        config : {
            auth : 'fmsSimple',
            handler : handlers.dbnames
        }

    },
    {
        method : 'GET',
        path : '/{db}/layoutnames',
        config : {
            auth : 'fmsSimple',
            handler : handlers.layoutNames
        }
    },
    {
        method : 'GET',
        path : '/{db}/scriptnames',
        config : {
            auth : 'fmsSimple',
            handler : handlers.scriptNames
        }
    },
    {
        method : 'GET',
        path : '/{db}/{layout}',
        config : {
            auth : 'fmsSimple',
            handler : handlers.find
        }
    },
    {
        method : 'POST',
        path : '/{db}/{layout}',
        config : {
            auth : 'fmsSimple',
            handler : handlers.new
        }
    },
    {
        method : 'GET',
        path : '/{db}/{layout}/{id}',
        config : {
            auth : 'fmsSimple',
            handler : handlers.read
        }
    },
    {
        method : ['PUT', 'PATCH'],
        path : '/{db}/{layout}/{id}',
        config : {
            auth : 'fmsSimple',
            handler : handlers.patch
        }
    },
    {
        method : 'DELETE',
        path : '/{db}/{layout}/{id}',
        config : {
            auth : 'fmsSimple',
            handler : handlers.delete
        }
    },


]

module.exports.register = function (server, options, next) {

    server.register(Basic, (err) => {
        server.auth.strategy('fmsSimple', 'basic', { validateFunc: validate });

        /*
         * add the FileMaker Server Client to the request o
         * so we can use it in the handlers
         */

        if(options.fmsAddress){
            client.setFMServerAddress(options.fmsAddress);
        }
        server.decorate('request', 'fms', client.request );


        // attach routes
        server.route(routes);

        next()
    });



};

exports.register.attributes = {
    name: 'fmsjsonapi',
    version: '0.0.1'
};