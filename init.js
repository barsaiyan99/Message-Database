const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
main().then(()=>{
    console.log("Successfull connection");
})
.catch(err=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/fakewhatsapp');
}
const allchat = [
    {
        from:"rohit",
        to:"mohit",
        msg:"chala jaa",
        created_at: new Date(),
    },
    {
        from:"amit",
        to:"sumit",
        msg:"tu hoga",
        created_at: new Date(),
    },
    {
        from:"peter",
        to:"tony",
        msg:"ya ya i know it",
        created_at: new Date(),
    },
    {
        from:"anchit",
        to:"rachit",
        msg:"abki baar modi sarkaar",
        created_at: new Date(),
    },
    {
        from:"divy",
        to:"ditya",
        msg:"love you 3000",
        created_at: new Date(),
    },
    {
        from:"neha",
        to:"rohit",
        msg:"moye moye!",
        created_at: new Date(),
    },
];
Chat.insertMany(allchat);