const { default: mongoose } = require("mongoose");

const User_Role=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    RoleId:{
        type:mongoose.Types.ObjectId,
        ref:'Role',
        required:true
    }
})

module.exports=mongoose.model('User_Role',User_Role)