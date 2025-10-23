const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.MONGO_URL;


mongoose.connect(mongoURL,{
   useNewUrlParser:true,
   useUnifiedTopology:true
});

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('Database Connected');
})

db.on('error',(err)=>{
    console.log('Database Connection Error',err);
})

db.on('Disconnected',()=>{
    console.log('Database Disconnected');
})

module.exports=db;