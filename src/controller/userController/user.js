
const { User } = require('../../entities/models/User')

// 회원가입
module.exports ={
    signup : async (res,req)=> {
        const user = new User(req.body)
        // const { name , email, password } = req.body
        const userInfo = await user.save()
        res.status(200).send(userInfo)
    },

    userInfo : async (res,req)=>{
        const user = new User(req.body)
        const userInfo = await user.find({})
        res.status(200).send(userInfo)
    },

    userUpdate : async (res,req)=>{
        const user = new User(req.body);
        const userInfo = await user.update
        res.status(200).send(userInfo)
    },

    userRemove :  async (res,req)=>{
        const user = new User(req.body)
        const userInfo = await user.delete();
        res.status(200).send(userInfo)
    }   
} 
