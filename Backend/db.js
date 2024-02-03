const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://mdasifhussain268:aruNTngg24Oll4kq@cluster0.wrtblng.mongodb.net/?retryWrites=true&w=majority";

//mongodb+srv://mdasifhussain268:<password>@cluster0.wrtblng.mongodb.net/?retryWrites=true&w=majority
async function connectToMongo() {
    await mongoose.connect(mongoURI).then(
        ()=> console.log("Connected to Mongo Successfully")
        ).catch(err => console.log(err));
  }
  
  module.exports = connectToMongo;
