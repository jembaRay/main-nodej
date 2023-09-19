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
    type:Number,
    required:true
},
GenKonnectID:{
    type:mongoose.Types.ObjectId,
    ref:'genKon',
    required:true
},
status:{
    type:Numbers,
    default:0
}
})
 module.exports=mong.model("Generator",Generator)