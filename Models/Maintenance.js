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
    date:{
        type:Date,
        required:true
    }
},{timestamps:true})

module.exports=mong.model('Maintenance',Maintenance)