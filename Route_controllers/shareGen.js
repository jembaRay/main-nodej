const Generator = require('../Models/Generator');
const router=require('express').Router()
const token=require('../JWT/jwt_openAI');
const User = require('../Models/User');
//search bar
router.get('/searchacc',async(req,res)=>{
    const {search}=req.body

    const query = await User.find({ First_name: { $regex: new RegExp(search, 'i') } });

    res.send(query)
})

router.post('/share',async(req,res)=>{

// Assuming you have the generator ID and the user ID to be shared with
const generatorId = req.body.genId;
const userIdToShareWith = req.body.userId;
 const tokene = req.headers.token;
  const userId = await token.getUserId(tokene);
Generator.findById(generatorId).then((generator) => {
   if (!generator) {
    // Generator not found
    res.status(404).send({ error: 'Generator not found.' });
  } else {
    // Check if the user is already shared with
    const isAlreadyShared = generator.sharedWith.some(user => user.userId == userIdToShareWith);
console.log(isAlreadyShared);
    if (isAlreadyShared) {
      res.status(400).send({ error: 'Generator is already shared with the user.' });
    } else {
      // Add the user ID to the sharedWith array
      generator.sharedWith.push({ userId: userIdToShareWith });
        User.findByIdAndUpdate(userIdToShareWith,{$set:{Active:true}},{new:true}).then((good)=>{
            ///console.log(good);
        }).catch((err)=>{
            console.log(err);
        })
      // Save the updated generator
      generator.save().then((save)=>{
        if (save) {
          res.send({ message: 'Generator shared successfully with the user.' });
        }
      })
    }
  }
}).catch((err)=>{
  if (err) {
    // Handle the error appropriately
    res.status(500).send({ error: 'Failed to retrieve generator.' });
  } 
})
})

module.exports=router