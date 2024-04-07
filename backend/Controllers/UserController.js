import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

import SignUpModel from "../Models/SignUp.js";


// Handling the SignUp Action
const SignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hasAlreadyUser = await SignUpModel.findOne({ email: email });
        // If the Already exists with the same email
        if (hasAlreadyUser) {
            res.status(400).json({ sucess: false, error: "User with this email Already exists.." });
        };

        // hashing the password of the user
        const salt = await bcrypt.genSalt(8);
        const securePassword = await bcrypt.hash(password, salt);

        // Creating the user
        const createdUser = await SignUpModel.create({
            name: name,
            email: email,
            password: securePassword
        });

        // Sending the JsonwebToken
        const data = {
            id: createdUser._id
        };
        const token = JWT.sign(data, process.env.JWT_SECRET);

        res.status(200).json({ sucess: true, message: `SignUp Sucessfully with '${name}' `, authToken: token });

    } catch (error) {
        // If the error occurs
        console.log(`Some Error Occurs while creating user.. with: ${error}`)
        res.status(500).json({ sucess: false, error: "Some Internal Server Error Occurs While SignUp.." });
    }
};



// Handling the Login Action
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hasUser = await SignUpModel.findOne({ email: email });
        // If the Email is envalied
        if (!hasUser) {
            res.status(401).json({ sucess: false, error: "Invalied email Please try again..." });
        };

        const isCorrectPassword = bcrypt.compare(password, hasUser.password);
        // If the Password is envalied
        if (!isCorrectPassword) {
            res.status(400).json({sucess: false, error: "Envalied Password Please try again..."});
        }

        // Sending the jsonWebToken
         const data = {
            user: hasUser._id
         };
         const token = JWT.sign(data, process.env.JWT_SECRET);

         res.status(200).json({sucess: true, message: "You has been login sucessfully..", authToken: token})

    } catch (error) {
        res.status(500).json({ sucess: false, error: "Some Error Occurs While Login..." });
        console.log(`Some Error Occurs while Login with: ${error}`);
    };
};



export { Login, SignUp };
