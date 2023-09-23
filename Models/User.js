const mong=require('mongoose')

const User=new mong.Schema({
    First_name:{
        type:String,
        required:true,
        
    },
    Last_name:{
        type:String,
        required:true,
       
    },
    Username:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true,
        minlength:6
    },
    Telephone:{
        type:Number,
        required:true,
        unique:true,
        minlength:9
    },
    Password:{
        type:String,
        required:true,
        minlength:6
    },
    Active:{
        type:Boolean,
        required:false,
        default:false
    }
},{timestamps:true})
module.exports=mong.model("User",User)