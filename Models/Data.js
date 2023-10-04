const mong=require("mongoose");
const Data=new mong.Schema({
GenKon:{
    type:mong.Types.ObjectId,
    ref:'Generator',
    required:true}
    ,
Data:[
    {
        Fuel:{type:Number,default:0},
        Temperature:{type:Number,default:0},
        batteryVoltage:{type:Number,default:0},
        Current:{type:Number,default:0}
    } ,
    {
        Fuel:{type:Number,default:0},
        Temperature:{type:Number,default:0},
        batteryVoltage:{type:Number,default:0},
        Current:{type:Number,default:0}
    } 
],
TimestampOff:{type:Date,default:0}
},{timestamps:true})
module.exports=mong.model('Data',Data)