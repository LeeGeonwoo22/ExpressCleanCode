const { User } = require('../../entities/models/User')

// 회원가입
module.exports ={
    signup : async (req,res)=> {
        const { name, password, email } = req.body
        
        console.log('res :', req.body)
        try{
            // if(!user) {
            //     return res.status(400).json({ success :  false , message : "invaild access"})
            // }
            // const userInfo = await user.save( name, password, email)
            // res.status(200).json(userInfo)
            if(!req.body){
                res.status(400).json({ success : false , message : "Content can not be emtpy!"})
            }
            else {
                const user = new User({
                    name : name, password : password, email : email
                })
                user.save(user)
                    .then(data => {
                        console.log(data)
                        res.redirect('/add-user')
                    })
                }
        }catch(err){
            return res.status(400).json({ success :  false , message : "invaild access"})
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
