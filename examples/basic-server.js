'use strict';

const Hapi = require ('hapi');
const fmrest = require('../plugin');


const server = new Hapi.Server();
server.connection({ port: 3000 });


//if FileMaker Server is on a different server change "localhost" to the url of the server
//Or pass it in as environment variable
const FMS_SERVER_ADDRESS = process.env.FMS_SERVER_ADDRESS ? process.env.FMS_SERVER_ADDRESS : 'locahost';


// we need to the know name of the primary key in the database
// currently we only support one name, so all primary keys need to be have the same name.
const ID_FIELD = 'id';


server.register({
        register: fmrest,
        options: {
            fmsAddress : FMS_SERVER_ADDRESS,
            idField : ID_FIELD
        }
    },
    ()=>{
        server.start(() => {
            console.log('FM REST SERVER running at:', server.info.uri);
            console.log('FMServer is at', FMS_SERVER_ADDRESS );
        })
    }
);