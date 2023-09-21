const jwt=require('jsonwebtoken')
const secrete='vhwjrecefefw485929509fncr395f542fbccfhtbtrdf3589f5rf'
const { Configuration, OpenAIApi } = require('openai');
module.exports={
generateToken:(user)=>{
    return jwt.sign({
        id:user.id,
        First_name:user.First_name
    },secrete)
},
parseAuth:(token)=>{
return token ? token.replace('Bearer ',''):null
},

getUserId:(authentication)=>{
    let userid=-1
    let token =module.exports.parseAuth(authentication)
    console.log(token);
    if(token!=null){
        try {
         jwt.verify(token,secrete,(err,good)=>{
            if(err) return console.log("wrong token ",err.expiredAt);
                if (good) {
                    //console.log(good);
                  userid=good.id
                  
                 // console.log({good});
                  
                }
                //console.log(userid);
            });
           

            if(userid==-1){
              console.log("login back bitch token expired");
              
            }
            //console.log(userid);
            return userid;
            
        } catch (err) {
            
           console.log(err);
        }
    }else{
        console.log({err:"you are not authenticated bitch"})
    }
},
runPromt:async (Ques)=>{
const config=new Configuration({
    apiKey:"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"
})

const AI=new OpenAIApi(config)
const result = await AI.createCompletion({
    model:"text-davinci-003",
    Temperature:1,
    prompt:Ques,
    max_Token:1000
})
return result
}


}