const express=require('express');
// const mongoose=require('mongoose');
// const User=require('./models/userauthmodel');
const cors = require('cors');
const dotenv=require('dotenv');
const colors=require('colors');
const connectDB = require('./config/db');
const userauthRoutes=require('./routes/userauthRoutes');
const userRoutes=require('./routes/userRoutes');
const adminauthRoutes=require('./routes/adminauthroutes');
const adminRoutes=require('./routes/adminRoutes');

const app=express();
app.use(cors());
dotenv.config();

// mongodb connection 
connectDB();


// rest object
app.use(express.json());

// post register
app.use('/',userauthRoutes);
app.use('/auth',userauthRoutes);

app.use('/auth',adminauthRoutes);

app.use('/user',userRoutes);

app.use('/admin', adminRoutes);


const PORT=process.env.PORT || 8080;

app.listen(PORT, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
})

