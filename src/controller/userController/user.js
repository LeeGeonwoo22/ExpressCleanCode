const { User } = require('../../entities/models/User')

// 회원가입
module.exports ={
    signup : async (req,res)=> {
        const { name, password, email } = req.body
        const user = new User({
            name, password, email
        })
        // const { name , email, password } = req.body
        console.log('res :', req.body)
        try{
            const userInfo = await user.save( name, password, email)
            res.status(200).json(userInfo)
        }catch(err){
            res.status(400).json({success : false, message : err})
        }
    },

    userInfo : async (req,res)=>{
        const user = new User(req.body)
        try{
            const userInfo = await user.find({})
            res.status(200).json(userInfo)
        }catch(err){
            res.status(400).json({success : false, message : err})
        }
    },

    userUpdate : async (req,res)=>{
        const user = new User(req.body);
        try{
            const userInfo = await user.update
            res.status(200).json(userInfo)
        }catch(err){
            res.status(400).json({success : false, message : err})
        }
    },

    userRemove :  async (req,res)=>{
        const user = new User(req.body)
        try{
            const userInfo = await user.delete();
            res.status(200).json(userInfo)
        }catch(err){
            res.status(400).json({success : false, message : err})
        }
    },
    
    userLogin : async (res,req)=>{

    },

    userLogout : async (res,req)=>{

    }
} 
