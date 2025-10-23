const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
    digit:{
        type:String,
        required:true,
        unique:true
    }
})

const validNumber = mongoose.model('validNumber',numberSchema);
module.exports=validNumber;