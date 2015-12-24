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
    req(options, (err, res, body)=>{
        if (err){
            return cb(err)
        }
        return cb(null, body)
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

    json = formatter(json.fmresultset)
    cb(json)
}

// async.componse flows right to left
const requestFMS = async.compose(convertStructure , convertXMLtoJS, fmreq);

module.exports = requestFMS;