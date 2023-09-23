const router  = require("express").Router();
const GenKonn = require("../Models/GenKonn");
const Generator = require("../Models/Generator");
const token=require('../JWT/jwt_openAI')
const userGen = require('../Models/userGen');
//to add a genkonn device for admin
router.post('/Konn',(req,res)=>{
const {SerialNo}=req.body
if (SerialNo==""||SerialNo.length<6) {
    res.status(400).send("hey dont give me a wrong serial")
}
GenKonn.create({SerialNo}).then((don)=>{
    res.status(201).send({don})
}).catch((error)=>{
    console.log(error);
    res.send({error})
})
})
//gives you all the generators if for admin
router.get('/allGen',(req,res)=>{
    Generator.find().then((all)=>{
        res.status(200).send({all})
    })
})
//gives you all the generators if for admin
router.get('/alluserGen',async(req,res)=>{
    let tokene=req.headers.token
    let  userId=await token.getUserId(tokene)
    userGen.find({userId}).populate('GenKonId.genId').then((all)=>{
        res.status(200).send({all})
    })
})
//to add a generatorwhen you already have one and you addd one that does not exist yet
router.post('/addgen',async (req,res)=>{
    const {serial,fuel,baseTemp,PowerOutPut}=req.body
    let tokene=req.headers.token
    let  userId=await token.getUserId(tokene)

    if (serial==""||serial.length<6) {
        return res.status(400).send({err:"hey dont give me a wrong serial"})
    }
    try {
userGen.find({userId}).then((found)=>{
    
if(found){
    GenKonn.find({SerialNo:serial}).then((Kon)=>{
     
        if (Kon[0].inUse==false) {   
        GenKonn.find({SerialNo:serial}).then((seen)=>{
            console.log(seen[0].id);
            Generator.create({fuel,baseTemp,PowerOutPut,GenKonnectID:seen[0].id})
            .then((creat)=>{
                if (creat) {
                    if (creat) {
                        console.log(creat);
                        userGen.updateOne({userId},{$push:{GenKonId:{genId:creat.id}}})
                        .then((up)=>{
                            console.log({"usergen":up});
                        })
                    }
                  GenKonn.updateOne({SerialNo:serial},{$set:{inUse:true}},{new:true}).then((up)=>{
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
}else{
    res.send("this user ain't got generators")
}
}).catch((err)=>{
    res.send({"err":err})
})
      
}catch(error) {
    res.send(error)
}
})
module.exports=router