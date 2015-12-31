'use strict'
const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();

let transformers = require('../lib/transformers');

lab.experiment('DBNames', ()=>{

    let result =  transformers.dbnames();

    lab.test('should return an object', (done) =>{
        Code.expect(result).to.be.an.object();
        done();
    });

    lab.test('with a property "-dbnames" equal to ""', (done) =>{
        Code.expect(result.qs['-dbnames']).to.equal('')
        done();
    });

});


lab.experiment('Layoutnames', ()=>{

    let requestMock = {
        params : {
            db: "Contact"
        }
    }

    let result =  transformers.layoutnames(requestMock)

    lab.test('should return an object', (done) =>{
        Code.expect(result).to.be.an.object();
        done();
    });

    lab.test('with some defined properties', (done) =>{
        Code.expect(result.qs['-db']).to.equal('Contact');
        Code.expect(result.qs['-layoutnames']).to.equal('');
        done();
    });

});

lab.experiment('scriptnames', ()=>{

    let requestMock = {
        params : {
            db: "Contact"
        }
    }

    let result =  transformers.scriptnames(requestMock)

    lab.test('should return an object', (done) =>{
        Code.expect(result).to.be.an.object();
        done();
    });

    lab.test('with some defined properties', (done) =>{
        Code.expect(result.qs['-db']).to.equal('Contact');
        Code.expect(result.qs['-scriptnames']).to.equal('');
        done();
    });

});

lab.experiment('GET Layout', ()=>{
    lab.experiment('with a query', ()=>{
        let requestMock = {
            params : {
                db: "Contact",
                layout : "ContactWeb"
            },
            query : {
                firstName : 'todd'
            }
        };
        let result = transformers.find(requestMock)


        lab.test('should return an object', (done)=>{
            Code.expect(result).to.be.an.object();
            done();
        });
        lab.test('should have a empty property,  "-find"', (done)=>{
            Code.expect(result.qs['-find']).to.equal('');
            done();
        });
    });

    lab.experiment('with out a query', ()=>{
        let requestMock = {
            params : {
                db: "Contact",
                layout : "ContactWeb"
            }
        };
        let result = transformers.find(requestMock)


        lab.test('should return an object', (done)=>{
            Code.expect(result).to.be.an.object();
            done();
        });
        lab.test('with a an empty property -findall', (done)=>{
            Code.expect(result.qs['-findall']).to.equal('');
            done();
        });

    })

});

lab.experiment('read with rec-id', ()=>{
    let requestMock = {
        params : {
            db: "Contact",
            layout : "ContactWeb",
            id : "23"
        }
    }
    let result = transformers.read(requestMock);

    lab.test('should return an object with an "id" property equal to 23', (done)=>{
        Code.expect(result.qs['-recid']).to.equal("23")
        done();
    })

})

lab.experiment('New', ()=>{
    let requestMock = {
        params : {
            db: "Contact",
            layout : "ContactWeb",
            query : {
                firstName : "Joe",
                lastName : "Smith"
            }
        }
    }
    let result = transformers.new(requestMock);

    lab.test('should return an object with an "-new" property equal to ""', (done)=>{
        Code.expect(result.qs['-new']).to.equal("");
        done();
    });
    lab.test('should return an object with an "qs.firstName" property equal to "Joe"', (done)=>{
        Code.expect(result.qs.firstName).to.equal("Joe");
        done();
    })
});

lab.experiment('update', ()=>{
    let requestMock = {
        params : {
            db: "Contact",
            layout : "ContactWeb",
            id : '121212',
            query : {
                firstName : "Joe",
                lastName : "Smith"
            }
        }
    };
    let result = transformers.update(requestMock);

    lab.test('should return an object with an "-edit" property equal to ""', (done)=>{
        Code.expect(result.qs['-edit']).to.equal("");
        done();
    })
    lab.test('should return an object with an "qs.firstName" property equal to "Joe"', (done)=>{
        Code.expect(result.qs.firstName).to.equal("Joe");
        done();
    })
    lab.test('should return an object with an "-recid" property equal to "121212"', (done)=>{
        Code.expect(result.qs['-recid']).to.equal("121212");
        done();
    })
});

lab.experiment('delete', ()=>{
    let requestMock = {
        params : {
            db: "Contact",
            layout : "ContactWeb",
            id : '121212',
        }
    };
    let result = transformers.delete(requestMock);

    lab.test('should return an object with an "-delete" property equal to ""', (done)=>{
        Code.expect(result.qs['-delete']).to.equal("");
        done();
    })
    lab.test('should return an object with an "-recid" property equal to "121212"', (done)=>{
        Code.expect(result.qs['-recid']).to.equal("121212");
        done();
    })
});