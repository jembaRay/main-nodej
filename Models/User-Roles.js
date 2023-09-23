const { default: mongoose } = require("mongoose");

const User_Role=mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    Role:{
        type:mongoose.Types.ObjectId,
        ref:'Role',
        required:true
    }
})