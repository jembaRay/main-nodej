const router=require('express').Router();
const GenKonn = require('../Models/GenKonn');
const Generator = require('../Models/Generator');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const User = require('../Models/User');

router.post("/siadash",async(req,res)=>{
const {serial,name,fuel,baseTemp,PowerOutPut}=req.body
let tokene=req.headers.token
let  userId=await token.getUserId(tokene)

if (serial==""||serial.length<6) {
    return res.status(400).send({err:"hey dont give me a wrong serial"})
}
try {
    GenKonn.find({SerialNo:serial}).then((Kon)=>{
        if (Kon) {
        GenKonn.find({$and:[{SerialNo:serial}/*{inUse:false}*/]}).then((seen)=>{
            if (seen[0].inUse==true) {
                res.send({"error":"serial already in use"})
            }else{
                // console.log({seen:seen[0].id});
                Generator.create({fuel,name,baseTemp,PowerOutPut,GenKonnectID:seen[0].id})
                .then((creat)=>{
                    if (creat) {
                        if (creat) {
                            console.log(creat);
                            userGen.create({
                                userId,
                                GenKonId:{genId:creat.id}
                            })
                        }
                      GenKonn.updateOne({SerialNo:serial},{$set:{inUse:true}},{new:true}).then((up)=>{
                        if (up) {
                            //update owner to true
                           User.updateOne({id:userId},{$set:{owner:true}}).then(()=>{
                            res.status(200).send(creat)  
                           })                             
                        }
                                          })
                    } 
                }).catch((error)=>{
                    res.send(error)
                })
            
            }
            })
        
        } else {
            res.send({"error":"no serial number as such or already in use"})
            
        }
    }).catch((error)=>{
    res.send(error)
    })
} catch (error) {
    res.send(error)
}

})

module.exports=router