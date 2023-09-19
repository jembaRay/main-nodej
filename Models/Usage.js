const mong=require('mongoose')

 
const Usage=new mong.Schema({
    state:{
        type:Number,
        required:true,
        default:0
    }
},{timestamps:true})


module.exports=mong.model('Usage',Usage) 