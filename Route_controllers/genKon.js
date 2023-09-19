const router  = require("express").Router();
const GenKonn = require("../Models/GenKonn");
const Generator = require("../Models/Generator");

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

router.get('/allGen',(req,res)=>{
    Generator.find().then((all)=>{
        res.status(200).send({all})
    })
})

module.exports=router