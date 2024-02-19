const jwt=require('jsonwebtoken')


module.exports = async(req,res,next)=>{
     
    try {
        if (req.headers["authorization"]) {
            // Split the Authorization header value to extract the token
            const token = req.headers["authorization"].split(" ")[1];
            // Further processing using the token...
        } else {
            // Handle the case where the Authorization header is missing
            console.error("Authorization header is missing in the request.");
            // Respond with an error or take appropriate action...
        }
        console.log("hi")
        jwt.verify(token, process.env.SECRET_KEY,(err,decode)=>{
             if(err){
                return res.status(401).send({
                    success:false,
                    message:"Authorization failed"
                })
             } else{
                req.body.userID=decode.userID;
                next();
             }
        })
    } catch (error) {
        console.log(error),
        res.status(401).send({
            status:false,
            error,
            message:'Auth failed'
        })
    }
}