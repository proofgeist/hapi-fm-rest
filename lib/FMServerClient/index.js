'use strict';


/*
A FileMaker Server Client based on request
 */

const req = require('request');
const async = require('async');
const parser = require('xml2js').parseString;
const formatter = require('./formatter');


const fmreq = (options, cb)=>{

    options.uri = 'https://gi-mu.geistinteractive.net/fmi/xml/fmresultset.xml';
    options.strictSSL=false;
    options.auth={
        user : 'admin',
        password : ''
    }

    req(options, (err, res, body)=>{
        let statusCode = res.statusCode;
        if (err){
            return cb(err)
        }else if(options.method = 'get' && statusCode !=200 ){
            return cb({statusCode:statusCode})
        }else {
            return cb(null, body)
        }
    })
};

const convertXMLtoJS = (xml, cb)=>{

    parser(xml,(err, result) =>{
        if (err){
            return cb(err)
        }
        return cb(null, result)
    })

};

const convertStructure = (json, cb)=>{


    //turns out the formatter is not async. but this works anyway.
    json = formatter(json.fmresultset);
    cb(null, json)
}

// async.componse flows right to left
const requestFMS = async.compose(convertStructure , convertXMLtoJS, fmreq);

module.exports = requestFMS;