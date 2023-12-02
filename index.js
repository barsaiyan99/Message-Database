const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ExpressError = require("./ExpressError.js");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
main().then(()=>{
    console.log("Successfull connection");
})
.catch(err=>{
    console.log(err);
})
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}
// const chat1 = new Chat({
//     from:"neha",
//     to:"priya",
//     msg:"lets be friend",
//     created_at: new Date(),
// });
// chat1.save().then(res=>{
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// });
app.get("/",(req,res)=>{
    res.render("home.ejs");
});
//index route
app.get("/chats",async(req,res)=>{
    try{
        let chats =  await Chat.find();
        console.log(chats);
        res.render("index.ejs",{chats});
    }
    catch(err){
        next(err);
    }
   
});
//new route
app.get("/chats/new",(req,res)=>{
    try{res.render("new.ejs");}
    catch(err){
        next(err);
    }
    
});
//create route
app.post("/chats",(req,res)=>{
    try{
        let{from,msg,to} = req.body;
        let newChat = new Chat({
            from:from,
            msg:msg,
            to:to,
            created_at:new Date(),
        });
        newChat.save().then(res=>{console.log(res);}).catch(err=>{console.log(err);});
        res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
    
});
//Edit route
app.get("/chats/:id/edit",async(req,res)=>{
    try{
        let{id} = req.params;
        let chat = await Chat.findById(id);
        res.render("edit.ejs",{chat});
    }
    catch(err){
        next(err);
    }
    
});
function asyncWrap(fn){
    return function(req, res,next){
        fn(req,res,next).catch((err)=>next(err));
    }
}

//update route
app.put("/chats/:id",async(req,res)=>{
    try{
        let{id} = req.params;
        let{msg:newMsg} = req.body;
        let updateChat=  await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
        console.log(updateChat);
        res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
    
})
//Destroy route
app.delete("/chats/:id",(req,res)=>{
    try{
        let{id} = req.params;
        let deleteChat = Chat.findByIdAndDelete(id);
        console.log(deleteChat);
        res.redirect("/chats");
    }
    catch(err){
        next(err);
    }
    
});
app.use((err,req,res,next)=>{
    let{status=500,message="some error occured"} = err;
    res.status(status).send(message);
});
app.listen(8080,()=>{
    console.log("app is listening at part 8080");
});