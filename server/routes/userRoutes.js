const express=require('express')
const userController=require('../controllers/userController');
const router=express.Router();


router.get('/policy',userController.viewPolicies);

router.post('/policy',userController.selectPolicy);

router.post('/claim',userController.PolicyClaim);

router.get('/claim',userController.viewClaim);



module.exports=router;