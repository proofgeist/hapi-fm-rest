'use strict';

const transformers = require('./transformers');
const client = require('./FMServerClient/index');



module.exports. dbnames = (request, reply) =>{

    let options =  transformers.dbnames(request);

    request.fms(options, (err, data)=>{
       if(err) {
           return reply(err);
       } else{
           return reply(data)
       }
    });

};