'use strict'

/*
functions that read the incoming request and
generate a an object containing the body or query
to be sent to FileMaker Server
 */

const Hoek = require('hoek');
const fmUtil = require('./FMServerClient/utilities');

/**
 *
 * @param request
 * @returns {{qs: {-dbnames: string}, method: string}}
 */
module.exports.dbnames = (request) => {
    return {
        qs: {'-dbnames' : ''},
        method : 'get'
    }
};

/**
 *
 * @param request
 * @returns {{-db: string, -layoutnames: string}}
 */
module.exports.layoutnames = (request)=>{
    return {
        qs : {
            '-db' : request.params.db,
            '-layoutnames' : ''
        },
        method : 'get'
    }
}

/**
 *
 * @param request
 * @returns {{-db: string, -scriptnames: string}}
 */
module.exports.scriptnames = (request)=>{
    return {
        qs:{
            '-db' : request.params.db,
            '-scriptnames' : ''
        },
        method : 'get'
    }
}

/**
 *
 * @param request
 * @returns {{-db: string, -lay: string}}
 */
module.exports.find = (request)=> {

    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout
    };
    if( !fmUtil.includesFields(request.query) ){
        obj['-findall'] = '';

    }else{
        obj['-find'] = '';
    }
    if(request.query != undefined && Object.keys(request.query).length != 0 ){
        Hoek.merge(obj, request.query );
    }
    let obj2 = {
        qs : obj,
        method : 'get'
    };

    return obj2
};


/**
 *
 * @param request
 * @returns {{-db: string, -lay: string, -recid: *}}
 */
module.exports.read = (request)=>{
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-recid' : request.params.id
    };
    obj = {
        qs : obj,
        method : 'get'
    }
    return obj
};

/**
 *
 * @param request
 * @returns {{-db: string, -lay: string, -new: string, data: *}}
 */
module.exports.new = (request)=>{
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-new' : '',
    };
    Hoek.merge(obj, request.params.query );
    obj = {
        qs : obj,
        method : 'post'
    }
    return obj
}

/**
 *
 * @param request
 * @returns {{-db: string, -lay: string, -edit: string, -recid: *, data: *}}
 */
module.exports.update = (request)=>{
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-edit' : '',
        '-recid' : request.params.id
    };
    Hoek.merge(obj, request.params.query );
    obj = {
        qs : obj,
        method : 'post'
    }
    return obj
};

/**
 *
 * @param request
 * @returns {{-db: string, -lay: string, -recid: *, -delete: string}}
 */
module.exports.delete = (request) => {
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-recid' : request.params.id,
        '-delete' : ''
    };
    obj = {
        qs : obj,
        method : 'get'
    }
    return obj
}