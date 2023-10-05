const router=require('express').Router()
const Maintenance=require('../Models/Maintenance')
//create a maintenance 
router.post('/maintenance',(req,res)=>{
const {genId,Motif,date}=req.body
console.log(req.body);
if (genId==''||Motif==''||date==''){
    res.send({'err':'empty fields'})
}

Maintenance.create({genId,Motif,date}).then((main)=>{
if (main) {
    res.status(200).send(main);
}
}).catch((err)=>{
    res.send({'error creating':err})
})
})
router.get('/listmaintenance/:genId/:date',(req,res)=>{
    const {genId,date}=req.params
    console.log(genId,date);
Maintenance.find({genId,date}).then((main)=>{
    console.log(main);
     
        res.status(200).send(main)
    
})
})    
module.exports=router