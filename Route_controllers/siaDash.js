const router=require('express').Router();
const GenKonn = require('../Models/GenKonn');
const Generator = require('../Models/Generator');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI')

router.post("/siadash",async(req,res)=>{
const {serial,fuel,baseTemp,PowerOutPut}=req.body
let tokene=req.headers.token
let  userId=await token.getUserId(tokene)

if (serial==""||serial.length<6) {
    return res.status(400).send({err:"hey dont give me a wrong serial"})
}
try {
    GenKonn.find({SerialNo:serial}).then((Kon)=>{
        if (Kon) {
            GenKonn.find({SerialNo:serial}).then((seen)=>{
                console.log(seen[0].id);
                Generator.create({fuel,baseTemp,PowerOutPut,GenKonnectID:seen[0].id})
                .then((creat)=>{
                    if (creat) {
                        if (creat) {
                            console.log(creat);
                            userGen.create({
                                userId,
                                GenKonId:{genId:creat.id}
                            })
                        }
                      GenKonn.updateOne({SerialNo:serial},{$set:{inUse:true}},{$new:true}).then((up)=>{
                        if (up) {
                            res.status(200).send({creat})    
                        }
                                          })
                    } 
                }).catch((error)=>{
                    res.send(error)
                })
            

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