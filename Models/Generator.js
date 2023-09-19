const { default: mongoose } = require('mongoose');
const mong=require('mongoose');

const Generator=new mong.Schema({
fuel:{
    type:Number,
    required:true
},
baseTemp:{
    type:Number,
    required:true
},
PowerOutPut:{
    type:String,
    required:true
},
GenKonnectID:{
    type:mongoose.Types.ObjectId,
    ref:'genKon',
    required:true
},
status:{
    type:Number,
    default:0
}
})
 module.exports=mong.model("Generator",Generator)