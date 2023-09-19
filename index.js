const exp=require('express')
require('dotenv').config()
const app=exp()

const mong=require('mongoose')
const parser=require('body-parser')
const cors=require('cors')
const ip=process.env.ip
const user=require('./Route_controllers/Auth_controller')
const gen=require("./Route_controllers/ON_gen")
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())
app.use(exp.json())
app.use(cors(
    {
      origin: true,
      credentials: true
    }
))
mong.connect('mongodb://localhost:27017/project').then(()=>{
        console.log('connected to project');
})
app.use('/',user)
app.use('/',gen)
app.listen(5000,ip,(req,res)=>{
    console.log('listening');
})
