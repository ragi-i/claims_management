const mongoose=require('mongoose')

const userschema= new mongoose.Schema(
   {
    userId:{
    type:String,
    required: true,
    
    },
    username :{
        type: String,
        required: [true, " PLease Provide a user name"],
        unique: true
    },
    name:{
        type : String,
        required: [true, "Please enter your name"]
    },

     email:{
        type: String,
         required: [true,"email is required"],
        unique:true
     },
     
     password:{
       type: String,
       required: [true, "Please provide a password"],
     },

    DOB : {
        type : String,
         required: [true, "Please enter your date of birth"]
    }, 
    contact:{
        type: Number,
        required: [true,"Please provide your contact no."],
        minlength: 10,
        maxlength: 10
    },
    address:{
          type: String,
          required : true
    },
    selectedPolicies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Policy'
        }
    ]
   },
   {
    timestamps: true
    }
)

const User=mongoose.model('User',userschema)
module.exports = User;