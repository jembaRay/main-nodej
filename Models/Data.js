const { default: mongoose } = require("mongoose");

const mong=mongoose
const Data=new mong.Schema({
GenKon:{type:String,required:true},
Data:[
    {
        Fuel:{type:Number,default:0},
        Temperature:{type:Number,default:0},
        Voltage:{type:Number,default:0},
        Current:{type:Number,default:0}
    } 
],
TimestampOff:{type:Date}
},{timestamps:true})
module.exports=mong.model('Data',Data)