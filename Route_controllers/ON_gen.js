const router=require('express').Router()
const usage=require('../Models/Usage');
const userGen = require('../Models/userGen');
const token=require('../JWT/jwt_openAI');
const Generator = require('../Models/Generator');

//to on generator you send me generator id and the state
router.post('/change', async (req, res) => {
  const { state, genId } = req.body;
  const tokene = req.headers.token;
  const userId = await token.getUserId(tokene);

  console.log({ "userId": userId, "genId": genId });

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
        })
      }
    } catch (err) {
      res.status(500).send({ "err": err.message });
    }
  }
});


module.exports=router