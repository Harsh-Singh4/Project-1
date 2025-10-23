const express=require('express');
const db=require('./db');

const validNumber = require('./Models/validNumber');

require('dotenv').config();

const bodyParser = require('body-parser');

const app=express();

app.use(bodyParser.json());

const numberRoutes=require('./Routes/numberRoutes');

app.use('/',numberRoutes);

const PORT=process.env.PORT ||3000;



app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})