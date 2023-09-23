const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');

router.get('/listgen',async(req,res)=>{
    const tokene = req.headers.token;
    const userId = await token.getUserId(tokene);

    let owngenerators=await  userGen.find({userId}).populate('GenKonId.genId').select('GenKonId.genId')
    let shared=await Generator.find({'sharedWith.userId':userId})
    res.send({'owned':owngenerators,'shared':shared})
}
)

router.get('/usershared',async(req,res)=>{
    const genId=req.body.genId
    const tokene = req.headers.token;
    const userId = await token.getUserId(tokene);

    let usersshared=await  userGen.find({$and:[{userId},{'GenKonId.genId':genId}]}).populate('GenKonId.genId.sharedWith.userId')
    res.send({'users sharing my generator':usersshared})
})

module.exports=router