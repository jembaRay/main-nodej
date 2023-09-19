const router=require('express').Router()
const bcrypt=require('bcrypt')
const client = require('twilio')(process.env.accountSid, process.env.authToken);
const jwt=require('jsonwebtoken')
const user=require('../Models/User')
const newLocal = require("openai");
const {Configuration,OpenAIApi}=newLocal
const numericPattern = new RegExp('^[0-9]+$')
const token=require('../JWT/jwt_openAI')
// 1xx Informational:

// // 100 Continue: The initial part of the request has been received and the client should proceed with the rest of the request.
// // 2xx Success:

// // 200 OK: The request has been successful.
// // 201 Created: The request has been fulfilled, and a new resource has been created as a result.
// // 204 No Content: The server successfully processed the request but does not need to return a response body.

// // 3xx Redirection:
// // 301 Moved Permanently: The requested resource has been permanently moved to a new location.
// // 302 Found: The requested resource has been temporarily moved to a different location.
// // 304 Not Modified: The resource has not been modified since the last request.

// // 4xx Client Errors:
// // 400 Bad Request: The server cannot understand the request due to invalid syntax or other client-side errors.
// // 401 Unauthorized: The request requires user authentication.
// // 403 Forbidden: The client does not have permission to access the requested resource.
// // 404 Not Found: The requested resource could not be found on the server.
// // 5xx Server Errors:

// // 500 Internal Server Error: A generic server error occurred.
// // 502 Bad Gateway: The server acting as a gateway received an invalid response from an upstream server.
// // 503 Service Unavailable: The server is temporarily unable to handle the request.
// // 504 Gateway Timeout: The server acting as a gateway did not receive a timely response from an upstream server.
router.post('/register',(req,res)=>{
   const{First_name,Last_name,Email,Telephone,Password,confirmPass}=req.body;

   if (First_name==""||Last_name==""||Email==""||Telephone==""||Password=="") {
       return res.status(400).send("a column is empty please chek out")
   }
   if(Password!==confirmPass){
      return res.status(400).send("not the same password")
   }
   
   if (Email.length <= 6) {
    res.status(500).send({err:`Email ${Email} is shorter than the minimum allowed length (6)`}) 
   }
   if (typeof(Telephone)!== 'number'){
    res.status(500).send({err:'No strings on telephone please'})
   }

    user.findOne({First_name,Last_name,Email,Telephone}).then((users)=>{
        if (users) {
           return  res.status(400).send({err:'user exist'})
        } else {
            bcrypt.hash(Password,7,(err,bcrypted)=>{
                if (bcrypted) {
                    user.create({
                        First_name,Last_name,Email,Telephone,Password:bcrypted
                    }).then((user)=>{
                        return res.status(201).send(user)
                    }).catch((err)=>{
                        return res.status(403).send(err)
                    })
                }else{
                    return res.send(err)
                 }
               })
        }
   })
   
})
router.post("/Login",(req,res)=>{
    const {Email,Password}=req.body;
    if(Email==""||Password==""){
        return res.send({err:'empty field'})
    }
    user.findOne({Email}).then((users)=>{
        if (users){
            bcrypt.compare(Password,users.Password,(err,good)=>{   
                if (good) {
                    let access_token=token.generateToken(users)
                  return  res.status(200).send({good:users,accesstoken:access_token}) 
                }else{
                    return res.send({err:"Wrong pass"})
                }
            })
        }else{
            console.log("nothing");
        }
    })
})

//this route is to verify if password mashes onli before going to change
router.post("/verify_pass",(req,res)=>{
const {Password}=req.body
let tokene=req.headers.token
let  userid=token.getUserId(tokene)
// console.log(userid);
if (Password==""){
    return res.send({err:'Password field empty enter your actual pass please'})
}
    try {
        if (userid==-1) {
            return res.status(400).send({err:'Login back please'})
        } else {
            user.findById(userid).then((user)=>{
                if(user){
                    bcrypt.compare(Password,user.Password,(err,good)=>{ 
                        if (good) {
                            return res.status(200).send({succesfull:"you can now change your password",good})
                        }else{
                            return res.send({err:"not the password for the account"})
                        }
                    })
                }
            })
         }
    } catch (error) {
        return res.send(error)
    }
})


//this route is to change
router.post("/send_OTP",async (req,res)=>{
    const {Phone}=req.body

    if (Phone!==""||null) {
       
       let result=await sendVerificationCode(Phone)
            return res.send({result:result})
        
    } else {
        res.send('enter password')
    }
})
// wrong phone verif
router.post("/update_pass",async (req,res)=>{
    const {Password,code,Phone}=req.body
    const tokene=req.headers.token
    const userid=token.getUserId(tokene)
        if (Password!==""||code!==""||Phone!=="") {
        if (userid!==-1) {
            let result=await verifyCode(Phone,code)
            console.log(result);
            if (result==undefined) {
                return res.send("server crash")
            } else if(result.valid==false){
                res.status(401).send("Wrong OTP pass")
            }else if(result.valid==true){
                try {
                    user.findById(userid)
                    .then((found)=>{
                        if (found) {
                            bcrypt.compare(Password,found.Password,(err,good)=>{
                                if (good) {
                                    return res.status(404).send({err:"Don't write the same password"})
                                }else {

                                    bcrypt.hash(Password,6,(err,bcrypted)=>{
                               
                                        if (bcrypted) {
                                 //mof//sa ne amrche pas suis sure//sava jai regle
                                         user.findByIdAndUpdate(userid,{Password:bcrypted})
                                            .then((updated)=>{
                                                console.log(updated);
                                                return res.status(201).send({good:`${found.First_name} this is your updated acct ${updated}`})
                                            }).catch((err)=>{
                                                console.log(err);
                                            })
                                        } 
                                        })
                                }
                            })
                        }
                    })
                } catch (error) {
                    res.send(error)
                }
            }
        } else {
            return res.status(403).send({err:"please Login back token expired"})
        }
    } else {
        res.status(403).send('enter all the fields correctly')
    }
})



router.get('/id', async (req, res) => {
    try {
      let tokene=req.headers.token
     let  userid=token.getUserId(tokene)
     console.log(userid);
      return res.status(200).send({"userid":userid});
    } catch (err) {
        console.log(err);
      return res.status(500).send('Internal Server Error');
    }
  });
router.get('/count', async (req, res) => {
    try {
       user.count().then((count)=>{
        return res.send({ count });
       })
      
    } catch (err) {
      console.error('Error while counting documents:', err);
      return res.status(500).send('Internal Server Error');
    }
  });
router.post('/chat',async (req,res)=>{
let ques=req.body.ques

const result=await runPromt(ques)
console.log(result); 
})

  ////////functions
 function sendText(code) {
    client.messages
  .create({
    body: `your OTP PASSWORD IS ${code}`,
    to: '+237692089363', // Text your number
    from: '+18056045725', // From a valid Twilio number
  })
  .then((message) => console.log(message) );

 } 
// Function to send a verification code
async function sendVerificationCode(phoneNumber) {
    try {
     const  verification = await client.verify.v2.services(process.env.SERVICE_SID).verifications.create({
        to: `+237${phoneNumber}`,
        channel: 'sms' // You can change the channel to 'call' if you prefer voice verification
      });
      console.log(`Verification code sent. SID: ${verification.status}`);
      return  verification 
    } catch (erro) {
        
      console.error('Error sending verification code:', erro);
      
    }
  }
  async function runPromt(Ques){
    const config={
        apiKey:"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"
    }
    
    const AI=new newLocal(config)
    const result = await AI.chat.completions.create({
        model:"text-davinci-002",
        Temperature:1,
        prompt:Ques,
        max_Token:1000
    })
    return result
    }

 async function verifyCode(phoneNumber, code) {
    try {
      const verificationCheck = await client.verify.v2.services(process.env.SERVICE_SID).verificationChecks.create({
        to: `+237${phoneNumber}`,
        code: code
      });
      return verificationCheck
    //   console.log(`Verification status: ${verificationCheck.status}`);
    } catch (error) {
        
      console.error('Error verifying code:', error);
    }
  }
module.exports=router