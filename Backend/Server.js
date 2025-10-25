const express=require('express');
const db=require('./db');
const cors = require('cors');



const validNumber = require('./Models/validNumber');

require('dotenv').config();

const bodyParser = require('body-parser');

const app=express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

const numberRoutes=require('./Routes/numberRoutes');

app.use('/',numberRoutes);

const PORT=process.env.PORT ||3000;



app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
})