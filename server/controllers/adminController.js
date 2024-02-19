const Policy=require('../models/adminmodel');
const Claim=require('../models/usermodel');
const User=require('../models/userauthmodel');
const { PolicyClaim } = require('./userController');

const postPolicy = async (req, res) => {
    try {
      // console.log(hi);
        const { policyId, name, premiumAmount, coverageAmount, description } = req.body;
          
        // Check if the policy with the given serial number already exists
        const existingPolicy = await Policy.findOne({ name });
        if (existingPolicy) {
            return res.status(400).json({ message: "Policy with this policyId already exists" });
        }

        // Create a new policy
        const policy = new Policy({
            policyId,
            name,
            premiumAmount,
            coverageAmount,
            description
        });

        // Save the policy to the database
        await policy.save();

        res.status(201).json({ 
            message: "Policy posted successfully",
            policy
        });
    } catch (error) {
      console.error(error);
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getPendingClaims=async(req,res)=>{
      try {
        const pendingclaims=await Claim.find({status: 'Pending'});
        // .populate('userId','policyId'
        // ,'amountRequested').populate('coverageAmount','residualAmount');
        if(pendingclaims){
          res.status(200).send({
            pendingclaims
          });
        }
        else{
            res.send(404).send({
                message: 'All claims had already been checked by you.'
            })
        }

      } catch (error) {
         res.status(500).send({
            message:'Internal server error',
            error:error
         })
      }     
}


const approveClaim=async(req,res)=>{
  try {
    const { claimId } = req.body;

    // Find the claim by ClaimId
    const claim = await Claim.findOne({claimId});
    console.log(claimId)
    if (!claim) {
        return res.status(404).json({
            message: 'Claim not found'
        });
    }

    // Update the status of the claim
    claim.status = 'Approved';
    await claim.save();

    // Send the response
    res.status(200).json({ message: "Claim approved successfully", claim });
} catch (error) {
    console.error(error);
    res.status(500).json({
        message: 'Internal Server Error'
    });
}
}

  const rejectClaim = async(req,res)=>{
       try {
        const {ClaimId}=req.params;

        const claim=Claim.findById({ClaimId});
        if(!ClaimId){
          res.status(404).send({
              message:'Claim Not found'
          })
          claim.status='Rejected';
          await claim.save();
          res.status(200).json({ message: "Claim Rejected", claim });
  
        }
           } catch (error) {
           res.status(500).json({
                message:  'Internal Server Error'
            })
       }
  }

module.exports={postPolicy, getPendingClaims,approveClaim,rejectClaim};