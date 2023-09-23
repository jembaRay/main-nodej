const mong=require('mongoose')

const user_user=new mong.Schema({
    AdminId:{
        type:mong.Types.ObjectId,
        ref:'User',
        required:true
    },
    SubId:{
        type:mong.Types.ObjectId,
        ref:'User',
        required:true
    }
})
