const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');
const GenKonn = require('../Models/GenKonn');
const Data = require('../Models/Data');
const { now } = require('mongoose');

//to on generator you send me generator id and the state
router.post('/change', async (req, res) => {
  const { state, genId } = req.body;
  const tokene = req.headers.token;
  const userId = await token.getUserId(tokene);
  const currentDateTime = new Date();

  console.log({ "userId": userId, "genId": genId ,"state":state});

  if (userId === undefined || userId === -1) {
    res.status(401).send({ "err": "You are not authenticated." });
  } else {
    try {
      const foundDocuments = await userGen.find({
        $and: [
          { userId },
          { "GenKonId.genId": genId }
        ]
      });

      console.log(foundDocuments);

      if (foundDocuments.length === 0) {
        res.status(404).send({ "err": "Document not found." });
      } else {
        await Generator.updateOne(
          {_id: genId },
          { $set: { state: state } },
          { new: true }
         
        ).then((upd)=>{
            res.send({upd})
            if (state==1) {
              Data.create({GenKon:genId})
            }
            if (state==0) {
              Data.updateOne({TimestampOff:0},
                { $set: { TimestampOff:currentDateTime} },
                { new: true })
            }
        }).catch((err)=>{
          res.send({"err":"did not save i think"})
        })
      }
    } catch (err) {
      res.status(500).send({ "err": err.message });
    }
  }
});
router.get('/getchange/:serial', async (req, res) => {
let serial=req.params.serial
console.log(serial);
GenKonn.find({SerialNo:serial}).then((found)=>{
  
if (found.length>0) {
  Generator.find({GenKonnectID:found[0].id}).then((foun)=>{
    console.log(foun);
    if (foun.length>0) {
      res.send({'state':foun[0].state})
    } else {
      res.send({'state':0})
    }

  }).catch((err)=>{
    res.send(err)
  })
} else {
  res.send({"err":`no serial as ${serial}`})
}
}).catch((err)=>{
  res.send(err)
})
})

module.exports=router