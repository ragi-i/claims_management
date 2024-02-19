const express=require('express');
const { userdetails,loginController, registerController}= require('../controllers/userauthController');

const authMiddleware = require('../middlewares/authMiddleware');

const router=express.Router();

// register post
router.post('/userregister',registerController);

// login post
router.post('/userlogin',loginController);

router.get('/userdetails',userdetails);
 


module.exports=router;