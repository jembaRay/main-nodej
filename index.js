const exp=require('express')
require('dotenv').config()
const app=exp()

const mong=require('mongoose')
const parser=require('body-parser')
const cors=require('cors')
const ip=process.env.ip
const user=require('./Route_controllers/Auth_controller')
const gen=require("./Route_controllers/ON_gen")
const genko=require('./Route_controllers/genKon')
const siadas=require("./Route_controllers/siaDash")
const sharGen=require('./Route_controllers/shareGen')
const Maintenance=require('./Route_controllers/maintenance')
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

app.use('/',genko) 
app.use('/',siadas)
app.use('/',user)
app.use('/',gen)
app.use('/',sharGen) 
app.use('/',Maintenance)

app.listen(5000,ip,(req,res)=>{
    console.log('listening');
})
