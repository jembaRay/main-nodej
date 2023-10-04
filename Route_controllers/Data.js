const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');
const GenKonn = require('../Models/GenKonn');
const Data = require('../Models/Data');

// monitoring
router.get('/Monitor',(req,res)=>{
    const genId=req.body.genId
Data.find({GenKon:genId}).then((gen)=>{
res.send(gen[gen.length].Data[1])
}).catch((error)=>{
res.send((error))
})
})
// report
router.get('/getreport',(req,res)=>{
    const genId=req.body.genId
Data.find({GenKon:genId}).then((gen)=>{
res.send(gen)
}).catch((error)=>{
res.send((error))
})
})

//post data from esp
router.get('/postMon/:serial/:bat/:powe/:fuel',(req,res)=>{
    const {bat,powe,fuel,serial}=req.params
    GenKonn.findOne({SerialNo:serial}).then((ser)=>{
        if(ser.length>0){
            Generator.find({GenKonnectID:ser._id}).then((gen)=>{
                if(gen.length>0){
                    Data.updateOne({$and:[{GenKon:gen_id},{TimestampOff:0}]},{ $set: { "Data.1.Fuel": fuel,
                     "Data.1.Temperature": temp,
                      "Data.1.batteryVoltage": bat, 
                      "Data.1.Current": powe }}).then((dat)=>{
                        dat
                    })
                }
            })
        }
}).catch((error)=>{
res.send((error))
})
})
module.exports=router