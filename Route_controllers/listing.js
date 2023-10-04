const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');
const User = require('../Models/User');
const GenKonn = require('../Models/GenKonn');

router.get('/listgen',async(req,res)=>{
    const tokene = req.headers.token;
    const userId = await token.getUserId(tokene);
      userGen.find({userId:userId}).populate(['GenKonId.genId']).then((log)=>{
        console.log({'log':log[0].GenKonId[0].genId.GenKonnectID});
      })
    let owngenerators=await  userGen.find({userId:userId}).populate(['GenKonId.genId'])
    let shared=await Generator.find({'sharedWith.userId':userId})
    res.send({'owned':owngenerators,'shared':shared})
}
)

router.get('/serial/:desc',async(req,res)=>{
    let desc=req.params.desc
    console.log(desc);
let genK=await GenKonn.find({_id:desc}).select("SerialNo")
res.send(genK)
})
router.get('/listuser',async(req,res)=>{
    const tokene = req.headers.token;
    const userId = await token.getUserId(tokene);

    let users=await  User.find()
    res.send({users})
}
)
router.get('/usershared',async(req,res)=>{
    const genId=req.body.genId
    const tokene = req.headers.token;
    const userId = await token.getUserId(tokene);

    let usersshared= await userGen.find({$and:[{userId},{'GenKonId.genId':genId}]}).populate({
        path: 'GenKonId.genId',
        populate: {
          path: 'sharedWith.userId',
        }})
        res.send({'users sharing my generator':usersshared})
})

module.exports=router