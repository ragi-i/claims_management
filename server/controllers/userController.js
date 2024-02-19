const Claim=require('../models/usermodel');
const Policy = require('../models/adminmodel');
const User = require('../models/userauthmodel');
const { v4: uuidv4 } = require('uuid');

const viewPolicies = async (req, res) => {
    try {
        // Fetch all policies from the database
        const policies = await Policy.find({}, { _id: 0, __v: 0 });
        res.status(200).json({policies});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const selectPolicy = async (req, res) => {
    try {
        const { email, policyId } = req.body;

        // Fetch the user document and populate the selectedPolicies field
        const user = await User.findOne({ email }).populate('selectedPolicies');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the policy is already selected by the user
        const isPolicySelected = user.selectedPolicies.some(selectedPolicy => selectedPolicy.policyId === policyId);
        if (isPolicySelected) {
            return res.status(400).json({ message: "Policy is already selected by the user" });
        }

        // Fetch the selected policy from the database
        const policy = await Policy.findOne({ policyId });
        if (!policy) {
            return res.status(404).json({ message: "Policy not found" });
        }

        // Save the selected policy to the user's profile
        user.selectedPolicies.push(policy);
        await user.save();

        res.status(200).json({ message: "Policy selected successfully", policy });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const PolicyClaim = async (req, res) => {
   
  try {
    const { userId,policyId, amountRequested, details } = req.body;

    // Create a new claim
    

    const createClaim = new Claim({
      claimId: uuidv4(),
      userId,
      policyId,
      amountRequested,
      details
    });

    // Save the claim to the database
    await createClaim.save();
   

    res.status(201).json({ 
        // status:true,
        message: "Claim submitted successfully,Save the ClaimId and wait for the verification" ,
       createClaim
      
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const viewClaim=async(req,res)=>{
    const { claimId }=req.body;
    
    try {
        const myclaims=await Claim.findOne({claimId});
        if (!myclaims) {
            return res.status(404).json({
                message: 'Claim not found'
            });
        }
    
    res.status(200).send({
        // message: myclaims.status,
        myclaims
    })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" }); 
    }
}

module.exports={PolicyClaim,selectPolicy,viewPolicies,viewClaim};

