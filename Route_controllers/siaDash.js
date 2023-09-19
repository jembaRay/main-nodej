const Router=require('express').Router();
const GenKonn = require('../Models/GenKonn');
const Generator = require('../Models/Generator');


Router.post("/siadash",(req,res)=>{
const {serial,fuel,baseTemp,PowerOutPut,}=req.body
if (serial==""||serial.length<6) {
    res.status(400).send("hey dont give me a wrong serial")
}
try {
    GenKonn.find({SerialNo:serial}).then((Kon)=>{
        if (Kon) {
            Generator.create({fuel,baseTemp,PowerOutPut,GenKonnectID:serial})
            .then((creat)=>{
                if (creat) {
                    res.status(200).send({creat})
                } 
            }).catch((error)=>{
                res.send(error)
            })
        } else {
            
        }
    }).catch((error)=>{
    res.send(error)
    })
} catch (error) {
    res.send(error)
}
})