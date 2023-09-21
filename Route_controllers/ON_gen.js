const router=require('express').Router()
const usage=require('../Models/Usage')



router.post('/change',(req,res)=>{
const state=req.body.state
console.log(state);
    usage.find().then((f)=>{
         usage.updateOne(f.id,{
            $set:req.body
          },{new:true}).then((up)=>{
             console.log(up);
           return res.send({up})
             }).catch((err)=>{
        console.log(err);
        })
    })

})
router.get('/getchange/:val',(req,res)=>{
let {val}=req.params
console.log(val);
    // usage.find().then((f)=>{
    //     if (f) {
            
    //         return res.send({"state":f[0].state})
    //     }
    // })
})


module.exports=router