const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');

router.get('/listgen',async(req,res)=>{
    const tokene = req.headers.token;
    const userId = await token.getUserId(tokene);

    let owngenerators=await  userGen.find({userId}).populate('GenKonId.genId').select('GenKonId.genId')
    let shared=await Generator.find({'sharedWith.userId':userId}).populate('GenKonId.genId')
    res.send({'owned':owngenerators,'shared':shared})
}
)

module.exports=router