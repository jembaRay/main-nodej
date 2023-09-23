const mong=require('mongoose')

const user_user=new mong.Schema({
    AdminId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    SubId:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
})
