import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

const authentication = async (req, res, next) => {
    try {
        // Getting the authentication token from headers
        const token = req.headers.authtoken;

        // If the authentication token is not provided
        if (!token) {
            return res.status(400).json({ sucess: false, error: "Please provide authentication token" });
        }

        const data = jwt.verify(token, process.env.JWT_SECRET); 

        req.user = data.user; 
        
        next();

    } catch(error){
        console.log(`Some Internal server error occurs while Authenticating user with: ${error}`);
        return res.status(400).json({ sucess: false, error: "Invalied authentication token" });
    }

};


export default authentication;