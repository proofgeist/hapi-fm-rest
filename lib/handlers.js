'use strict';

const transformers = require('./transformers');
const Boom = require('boom');

const replyer = (err, data, reply)=>{
    //console.log(data)
    if(err) {
        if(err.statusCode === 401){
            return reply(Boom.unauthorized('invalid password'))
        }
        return reply(err);
    } else{
        return reply(data)
    }
}

module.exports.dbnames = (request, reply) =>{

    let options =  transformers.dbnames(request);
    request.fms(options, (err, data)=>{

       return replyer(err, data, reply)
    });

};

module.exports.layoutNames = (request, reply) =>{


    let options =  transformers.layoutnames(request);

    request.fms(options, (err, data)=>{

        return replyer(err, data, reply)
    });

};
module.exports.scriptNames = (request, reply) =>{

    let options =  transformers.scriptnames(request);

    request.fms(options, (err, data)=>{
        return replyer(err, data, reply)
    });

};
module.exports.layout = (request, reply) =>{

    let options =  transformers.find(request);

    request.fms(options, (err, data)=>{
        return replyer(err, data, reply)
    });

};