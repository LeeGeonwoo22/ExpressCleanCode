const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashing } = require('../../config/hashing')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 12
    },
    email : {
        type : String,
        lowercase : true,
        required : true,
        trim :  true,
        unique : 1
    },
    password : {
        type : String,
        trim : true,
        required : true,
        minlegth : 5
    },
    role : {
        type : Number,
        default : 0
    },
    image : String,
    token : {
        type : String
    },
    tokenExp : {
        type : Number
    }
})

const User = mongoose.model('User', userSchema)

module.exports = { User, userSchema }