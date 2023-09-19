const mong=require('mongoose')

const userGen=new mong.Schema({
userId:{
    type:mong.Types.ObjectId,
    ref:'User',
    required:true
},
GenKonId:[{
        genId:{
    type:mong.Types.ObjectId,
    ref:'Generator',
    required:true
    }
}
]
})

module.exports=mong.model('userGen',userGen)