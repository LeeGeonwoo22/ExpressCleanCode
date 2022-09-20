const express = require('express');
const router = express.Router();
const {User} = require("../../orm/models/User")

// 회원가입
router.post('/signup', (req,res)=>{

    const user = new User(req.body);
    user.save((err, doc) =>{
      if(err) return res.json(
        {
          success : false , err
        }
      )
        return res.status(200).json({
          success : true
        })
    })
  })


router.get('/logout',  (req, res) => {
  // console.log('req.user', req.user)
  User.findOneAndUpdate({ _id: req.user._id },
    { token: "" }
    , (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
})

// 로그인
router.post('/login', (req,res)=>{
  
  User.findOne({email : req.body.email} , (err, user) =>{
    if(!user) {
      return res.json({
        loginSucess : false,
        message : "이메일에 해당하는 유저가 없습니다."
      })
    }
    // 해당 유저가 있음
    user.comparePassword(req.body.password, (err, isMatch) =>{
      if(!isMatch) return res.json({ loginSucess : false, message : "비밀번호가 틀렸습니다."})

      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // 토큰 저장 . 쿠키 ? 로컬 스토리지?
        res.cookie("fortuneCookie", user.token)
        .status(200)
        .json({ loginSucess : true, userId : user._id})
      })

    })
  })
})

module.exports = router;
  