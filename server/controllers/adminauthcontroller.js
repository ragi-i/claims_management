const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Adminmodel = require('../models/adminauthmodel');
const uuid = require('uuid');

// Admin Registration
const registercontroller= async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        const existingAdmin = await Adminmodel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin with this email already exists" });
        }
      
        // Hash the password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin
        const admin = new Adminmodel({
            name,
            email,
            password
            
        });

        // Save the admin to the database
        await admin.save();

        // Return success response
        res.status(201).json({ 
        message: "Admin registered successfully, PLease save the adminID for future login", 
        admin
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Admin Login
const logincontroller = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find admin by email
        const admin = await Adminmodel.findOne({ email});
    
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Check if the password is correct
        // const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        // const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Return success response with token
        res.status(200).json({ message: "Admin logged in successfully", 
        admin
          // token ,
    });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports={registercontroller,logincontroller}