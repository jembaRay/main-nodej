const { default: mongoose } = require("mongoose");

const Roles=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model('Roles',Roles)