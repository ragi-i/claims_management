const express=require('express');
const {postPolicy, getPendingClaims, approveClaim, rejectClaim}=require('../controllers/adminController');

const router=express.Router();

router.post('/policy',postPolicy);

router.get('/claims/pending', getPendingClaims);

router.put('/claims/approved',approveClaim);

router.put('/claims/rejected',rejectClaim)

module.exports=router;
