const mongoose = require('mongoose');


// Creating  Schema
let userSchema = mongoose.Schema({

    name : { type : String , required : true },
    email     : { type : String  },
    password  : { type : String  },
    isVerified: { type: Boolean, default: false },
    resetLink : { type: String , default: '' },
    googleID  : {type : String}

});

// Creating  Model
let userModel =  mongoose.model('User' , userSchema , 'users');


module.exports  =  userModel ;
