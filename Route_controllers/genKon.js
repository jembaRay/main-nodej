const Router  = require("express").Router();
const GenKonn = require("../Models/GenKonn");

//to add a genkonn device for admin
Router.post(('/addKonn',(req,res)=>{
const {SerialNo}=req.body

if (SerialNo==""||SerialNo.length<6) {
    res.status(400).send("hey dont give me a wrong serial")
}

GenKonn.create({SerialNo}).then((don)=>{

}).catch((error)=>{
    res.send({error})
})


}))
GenKonn