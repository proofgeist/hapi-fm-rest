"use strict";

/*
this should get moved into the fmServer client folder
in a new module. TODO
 */


const Code = require('code');   // assertion library
const Lab = require('lab');
const lab = exports.lab = Lab.script();


const fmUtilities = require('../lib/FMServerClient/utilities')


lab.experiment('Utility', {skip:false}, ()=>{
    lab.experiment( 'includesFields()', ()=>{
        lab.test('should return false if obj has no properties that do not begin with "-"', (done)=>{
            let obj = {'-max':2, '-sort': 'Asc'}
            let x = fmUtilities.includesFields(obj)
            Code.expect(fmUtilities.includesFields(obj)).to.be.false()
            done()
        });
        lab.test('should return true if obj has atleast one property that does not begin with "-"', (done)=>{
            let obj = {'-max':2, '-sort': 'Asc', 'firstName' : "joe"}
            Code.expect(fmUtilities.includesFields(obj)).to.be.true()
            done()
        });
        lab.test('should return false if obj is Empty', (done)=>{
            let obj = {}
            Code.expect(fmUtilities.includesFields(obj)).to.be.false()
            done()
        })
    })

});

//lab.test('should return false if obj has no properties that do not begin with "-"', (done)=>{})