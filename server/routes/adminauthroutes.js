const express=require('express');
const { logincontroller, registercontroller}= require('../controllers/adminauthcontroller');
// const authMiddleware = require('../middlewares/authMiddleware');

const router=express.Router();

// register post
router.post('/adminregister',registercontroller);

// login post
router.post('/adminlogin',logincontroller);
 


module.exports=router;