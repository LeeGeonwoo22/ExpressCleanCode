const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRound = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 20
    },
    email : {
        type : String,
        trim :  true,
        unique : 1
    },
    password : {
        type : String,
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
// 비밀 번호를 암호화 시킨다.
userSchema.pre('save', function( next ){
    // 위의 USER를 가르킴 
    const user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(saltRound, function(err,salt){
            if(err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                // 에러가 생길경우
                if(err) return next(err)
                // 암호화가 성공할 경우
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
    })
}
userSchema.methods.generateToken = function(cb) {
    const user = this;

    const token = jwt.sign(user._id.toHexString(),'secretToken')
    user.token = token
    user.save(function(err,user) {
        if(err) return cb(err)
        cb(null, user)
    })

}
const User = mongoose.model('User', userSchema)

module.exports = { User }