// const usermodel = require("../models/authmodel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userauthmodel');
const { v4: uuidv4 } = require('uuid');

const joi = require('joi');

const password_complexity = require('joi-password-complexity');

const userdetails=async(req,res) =>{
     try {
        // Fetch all policies from the database
        const userdetail = await User.find({}, { _id: 0, __v: 0,address:0,username:0,DOB:0,password:0});
        res.status(200).json({userdetail});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const registerController = async (req, res) => {
    try {

        const { username, name, email, password, DOB, contact, address } = req.body;
        const existinguser = await User.findOne({ email: req.body.email });

        // validation 
        if (existinguser !== null) {
            return res.status(200).send({
                status: false,
                message: " User already exists",

            })
        }

        const newUser = new User({ 
            userId: uuidv4(),
            username, name, email, password, DOB, contact, address });

        const savedUser = await newUser.save();
        //    console.log(savedUser)
        res.status(201).send({
            status: true,
            message: "User successfully registered",
            savedUser,
            userID: savedUser._id
        })

   
    } catch (error) {
        console.error("Error in Register API:", error);
        res.status(500).send({
            status: false,
            message: 'Error in Register API',
            error: error
        })
    }

}

// login controller
const loginController = async (req, res) => {

    const { email, password } = req.body;
    try {
        // Check if the user exists with the provided email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the provided password matches the user's password
        if (user.password !== password) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        return res.status(200).send({
            status: true,
            message: 'Login Successfully',
            user
        }).json({ email: email });


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in Login API',
            error
        })
    }
}

module.exports = { registerController, loginController,userdetails };