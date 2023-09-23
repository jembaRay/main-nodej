const router=require('express').Router()
const Maintenance=require('../Models/Maintenance')
//create a maintenance 
router.post('/maintenance',(req,res)=>{
const {genId,Motif,date}=req.body

if (genId==''||desc==''||date==''){
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
router.get('/listmaintenance',(req,res)=>{
    const {genId}=req.body
Maintenance.find({genId}).then((main)=>{
    if (main.lenght>0) {
        res.status(200).send(main)
    }else{
        res.status(404).send('No maintenance here')
    }
})
})    
module.exports=router