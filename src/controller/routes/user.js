const express = require('express');
const router = express.Router();

const userController = require('../userController/user');
// const signcontroller = require("../signcontroller/users");

router.get('/', (req, res) => {
  res.json('Hello World!')
})

router.post('/users', userController.signup);
router.get('/users', userController.userInfo);
router.patch('/users', userController.userUpdate);
router.delete('/users', userController.userRemove);


module.exports = router;