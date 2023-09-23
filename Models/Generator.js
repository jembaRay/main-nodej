const { default: mongoose } = require('mongoose');
const mong=require('mongoose');

const Generator=new mong.Schema({
 name:{
    type:String,
    required:true
},
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
state:{
    type:Number,
    default:0
},
sharedWith: [{
    userId:{
     type: mongoose.Schema.Types.ObjectId, 
     ref: 'User'
    }
     }]
})
 module.exports=mong.model("Generator",Generator)