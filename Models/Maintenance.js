const mong =require('mongoose')

const Maintenance=new mong.Schema({
    genId:{
        type:mong.Types.ObjectId,
        ref:'Generator',
    },
    Motif:{
        type:String,
        required:true
    },
    scheduleDate:{
        type:Date,
        required:true
    }
})



mondule.exports=mong.model('Maintenance',Maintenance)