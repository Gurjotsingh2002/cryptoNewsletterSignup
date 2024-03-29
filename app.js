
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request")
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>
{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",(req,res)=>
{
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const email=req.body.email;

    console.log(firstname , lastname ,email);

    const data={

        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstname,
                    LNAME:lastname
                }

            }
        ]
    };

    const jsonData=JSON.stringify(data);
    const url="https://us11.api.mailchimp.com/3.0/lists/2ed98cadf9";
    const options={
        method:"POST",
        auth :"Gurjot:24ff47a6c3494f981bfcd0abb29fa2d5-us11"
    }
    const request=https.request(url,options,function(response){

    
        if(response.statusCode===200){
            
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        response.on("data",(data)=>
        {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

})
app.post("/failure.html",(req,res)=>{
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,()=>
{
    console.log("server at :3000");
})
// 24ff47a6c3494f981bfcd0abb29fa2d5-us11
//2ed98cadf9
//https://fast-oasis-94609.herokuapp.com/