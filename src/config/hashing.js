require('dotenv').config()
const { User } = require('../entities/models/User')
const bcrypt = require('bcrypt');
const saltRound = process.env.DB_SALT
const jwt = require('jsonwebtoken');

module.exports ={

hashing : async (req,res) =>{
    const Schema = User.schema

    // 비밀 번호를 암호화 시킨다.
Schema.pre('save', function( next ){
    // 위의 USER를 가르킴 
    const user = User;
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

Schema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
            cb(null, isMatch)
    })
}
Schema.methods.generateToken = function(cb) {
    const user = User;

    const token = jwt.sign(user._id.toHexString(),'secretToken')
    user.token = token
    user.save(function(err,user) {
        if(err) return cb(err)
        cb(null, user)
    })

    }            
}
}
