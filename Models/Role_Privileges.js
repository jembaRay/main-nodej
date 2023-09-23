const { default: mongoose } = require("mongoose");

const Role_Privileges=new mongoose.Schema({
    RoleId:{
        type:mongoose.Types.ObjectId,
        ref:'Role',
        required:true
    },
    PrivId:{
        type:mongoose.Types.ObjectId,
        ref:'Priviliges',
        required:true
    }
})

module.exports=mongoose.model('Role_Privileges',Role_Privileges)