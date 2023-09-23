const mong=require('mongoose')

const Priviliges=new mong.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mong.model('Priviliges',Priviliges)