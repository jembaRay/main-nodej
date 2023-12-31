const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');
const GenKonn = require('../Models/GenKonn');
const Data = require('../Models/Data');

// monitoring
router.get('/Monitor/:genId',(req,res)=>{
    const genId=req.params
Data.find({GenKon:genId}).then((gen)=>{
res.send(gen[gen.length].Data[1])
}).catch((error)=>{
res.send((error))
})
})
router.get('/Monit/:genId',(req,res)=>{
    const genId=req.params
Data.find({}).then((gen)=>{
res.send(gen)
}).catch((error)=>{
res.send((error))
})
})
// report
router.get('/getreport',(req,res)=>{
    const genId=req.body.genId
    console.log(genId);
    if (genId!==undefined) {
      Data.find({GenKon:genId}).then((gen)=>{
        res.send(gen)
        }).catch((error)=>{
        res.send((error))
        })
    }else{
      res.send("no genid")
    }

})

//post data from esp
router.get('/postMon/:serial/:bat/:current/:powe/:fuel',(req,res)=>{
    const {bat,powe,fuel,serial}=req.params
    console.log(req.params);
    GenKonn.findOne({SerialNo:serial}).then((ser)=>{
        if(ser.length>0){
            Generator.find({GenKonnectID:ser._id}).then((gen)=>{
                if(gen.length>0){
                    Data.updateOne(
                        { $and: [{ GenKon: gen_id }, { TimestampOff: "0" }] },
                        {
                          $set: {
                            "Datas.[1].Fuel": fuel,
                            "Data.[1].Temperature": temp,
                            "Data.[1].batteryVoltage": bat,
                            "Data.[1].batteryCurrent": current,
                            "Data.[1].Current": powe
                          }
                        },{new:true}
                      ).then((dat) => {
                        res.send({ Data: dat });
                      });
                }
            })
        }
}).catch((error)=>{
res.send((error))
})
})
module.exports=router