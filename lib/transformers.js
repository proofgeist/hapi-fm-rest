'use strict'

module.exports.dbnames = (request) => {
    return { '-dbnames' : ''}
};

module.exports.layoutnames = (request)=>{
    return {
        '-db' : request.params.db,
        '-layoutnames' : ''
    }
}

module.exports.scriptnames = (request)=>{
    return {
        '-db' : request.params.db,
        '-scriptnames' : ''
    }
}

module.exports.find = (request)=> {

    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout
    };
    if(!request.query){
        obj['-findall'] = '';
    }else{
        obj['-find'] = '';
        obj.query = request.query
    }
    return obj
};

module.exports.read = (request)=>{
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-recid' : request.params.id
    };

    return obj
};

module.exports.create = (request)=>{
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-new' : '',
        'data' : request.params.query
    };

    return obj
}

module.exports.update = (request)=>{
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-edit' : '',
        '-recid' : request.params.id,
        'data' : request.params.query
    };

    return obj
};

module.exports.delete = (request) => {
    let obj = {
        '-db' : request.params.db,
        '-lay' : request.params.layout,
        '-recid' : request.params.id,
        '-delete' : ''
    };
    return obj
}