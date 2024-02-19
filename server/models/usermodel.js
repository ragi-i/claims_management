const mongoose = require('mongoose');
const Policy = require('./adminmodel');

const claimSchema = new mongoose.Schema({
  claimId :{
   type:String,
   required:true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    type:String,
    ref: 'User',
    required: true
  },
  // email:{
  //   type:String,
  //    required:true,
  //    unique:true
  // },
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    type:String,
    required: true
  },
  amountRequested: {
    type: Number,
    required: true
  },
  residualAmount: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Policy',
    default: Policy.coverageAmount
},
  details: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});

const Claim = mongoose.model('Claim', claimSchema);

module.exports = Claim;
