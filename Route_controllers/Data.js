const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');
const GenKonn = require('../Models/GenKonn');


router.get('/getdata',(req,res)=>{

})

module.exports=router