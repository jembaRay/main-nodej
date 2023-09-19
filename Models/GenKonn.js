const mong=require('mongoose')
const genkon=new mong.Schema({
SerialNo:{
    type:String,
    required:true
}
},{timestamps:true})


module.exports=mong.model("genkon",genkon)