const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');
const GenKonn = require('../Models/GenKonn');
const Data = require('../Models/Data');
const User = require('../Models/User');


router.delete('/delUser',(req,res)=>{
      const {genId,Userid}=req.body
        User.find({id:Userid}).then((user)=>{
            if(user){
                Generator.deleteOne({$and:[{"sharedWith.userId":Userid},{id:genId}]}).then(()=>{
                })
            }
        }).catch((error)=>{
        res.send((error))
})
})
// generator deletion
router.delete('/delgen/:genId',(req,res)=>{
    const {genId}=req.params
    console.log(req.params);
    Generator.find({id:genId}).then((gen)=>{
        const genKonnectID = gen[0].GenKonnectID
        GenKonn.updateOne({id:genKonnectID},{$set:{inUse:false}}).then(()=>{
        Generator.deleteOne({id:genId}).then(()=>{
        userGen.deleteOne({"GenKonId.genId":genId}).then(()=>{
            res.send("Generator deleted succesfully").status(200)
        })
            })
        })
    })
})
module.exports=router;