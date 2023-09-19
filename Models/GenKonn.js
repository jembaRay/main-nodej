const mong=require('mongoose')
const { BOOLEAN } = require('sequelize')
const genkon=new mong.Schema({
SerialNo:{
    type:String,
    required:true
},
inUse:{
    type:Boolean,
    default:false
}
},{timestamps:true})


module.exports=mong.model("genkon",genkon)