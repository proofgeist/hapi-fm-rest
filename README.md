# hapi-fm-rest

A Hapi Plugin that creates a RESTFul proxy to a FileMaker Server.  You can use this to create a REST Wrapper for FileMaker Servers XML Gateway.



## Usage 

### Installation

`npm install haps-fm-rest`

This is a Hapi plugin. You use it like any other Hapi plugin. You register it with a Hapi server. It should play nicely with the Hapi ecosystem.  The plugin takes two options.

```
options: {
    fmsAddress : <FMS_SERVER_ADDRESS>,
    idField : <the name of the primary key>
}
```
these default to localhost, and 'id' respectively.


Here is a complete Hapi Server that mounts the REST API at '/' on port 3000.

```
'use strict';

const Hapi = require ('hapi');
const fmrest = require('haps-fm-rest');

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
```

## Status
Alpha, the routes and data format may change.

## Authentication
The plugin protects routes with basic authentication, which is passed on to the FileMaker Server for authentication

## Data Format
JSON of course

Supported mime-types for sending data are the same as for standard hapi servers
* application/json
* application/x-www-form-urlencoded
* application/octet-stream
* text/*
* multipart/form-data


## Routes
The plugin mounts a set of RESTful routes for accessing FileMaker databases. All FileMaker Server XML Gateway query parameters are supported. -max, -sort, -script etc.  See FileMaker Custom Web Publishing with XML for more information.


### GET /dbanames
returns all the Databases available to the user.

### GET /{db}/layoutnames
Returns all layouts for the given db

### GET /{db}/scriptnames
Returns all scripts for the given db

### GET /{db}/{layout}
Performs a search on the given layout in the given DB. 

### POST /{db}/{layout}
Creates a record on the given layout in the given DB.

### GET /{db}/{layout}/{id}
Gets a record by it's primary key.

### PATCH /{db}/{layout}/{id}
Updates the specified record

### PUT /{db}/{layout}/{id}
Updates the specified record. The same as PATCH.

### DELETE /{db}/{layout}/{id}
deletes the specified record.


