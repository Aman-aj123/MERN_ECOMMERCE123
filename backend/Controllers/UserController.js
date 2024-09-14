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
            return res.status(400).json({
                sucess: false,
                error: "User with this email Already exists..",
            });
        }

        // hashing the password of the user
        const salt = await bcrypt.genSalt(8);
        const securePassword = await bcrypt.hash(password, salt);

        let role = "user";

        // Creating a admin user
        if (
            email === process.env.Admin_Email &&
            password === process.env.Admin_Password
        ) {
            role = "admin";
        }

        // Creating the user
        const createdUser = await SignUpModel.create({
            name: name,
            email: email,
            password: securePassword,
            role: role,
        });

        // Sending the JsonwebToken to the user
        const data = {
            user: {
                id: createdUser._id,
            },
        };
        const token = JWT.sign(data, process.env.JWT_SECRET);

        return res.status(200).json({
            sucess: true,
            message: `SignUp Sucessfully with '${name}' `,
            authToken: token,
        });
    } catch (error) {
        // If the error occurs
        console.log(`Some Error Occurs while creating user.. with: ${error}`);
        res.status(500).json({
            sucess: false,
            error: "Some Internal Server Error Occurs While SignUp..",
        });
        return;
    }
};

// Handling the Login Action
const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hasUser = await SignUpModel.findOne({ email: email });
        // If the Email is Invalied
        if (!hasUser) {
            return res
                .status(401)
                .json({ sucess: false, error: "Invalied email Please try again..." });
        }

        const isCorrectPassword = await bcrypt.compare(password, hasUser.password);
        // If the Password is Invalied
        if (!isCorrectPassword) {
            return res.status(400).json({
                sucess: false,
                error: "Invalied Password Please try again...",
            });
        }

        // Sending the jsonWebToken
        const data = {
            user: {
                id: hasUser._id,
            },
        };
        const token = JWT.sign(data, process.env.JWT_SECRET);

        return res.status(200).json({
            sucess: true,
            message: "You has been login sucessfully..",
            authToken: token,
        });
    } catch (error) {
        res
            .status(500)
            .json({ sucess: false, error: "Some Error Occurs While Login..." });
        console.log(`Some Error Occurs while Login with: ${error}`);
        return;
    }
};

// Handling the get user Action
const GetUser = async (req, res) => {
    const userId = req.user.id;

    try {
        const User = await SignUpModel.findById(userId).select("-password");
        res
            .status(200)
            .json({ sucess: true, message: "User has sucessfully finded...", User });
    } catch (error) {
        console.log(
            `Some Internal server error occurs while getting user with: ${error}`
        );
        return res.status(500).json({
            sucess: false,
            error: "Some Internal server error occurs while Getting user..",
        });
    }
};

// Handling the Updateuser Action
const UpdateUser = async (req, res) => {
    try {
        const User = await SignUpModel.findById(req.params.userId);
        if (!User) {
            return res.status(400).json({
                sucess: false,
                error: `User  dosen't exists with this id: ${req.params.userId} `,
            });
        }

        // If the user wants to edit the profile of another user
        if (req.user.id.toString() !== req.params.userId) {
            return res.status(400).json({ sucess: false, error: "Not allowed..." });
        }

        const { name, email, password } = req.body;
        // hashing the password of the user
        const salt = await bcrypt.genSalt(8);
        const securePassword = await bcrypt.hash(password, salt);

        let role = "user";

        // Creating a admin user
        if (
            email === process.env.Admin_Email &&
            password === process.env.Admin_Password
        ) {
            role = "admin";
        }

        const updatedUser = {
            name: name,
            email: email,
            password: securePassword,
            role: role,
        };
        const finalUser = await SignUpModel.findByIdAndUpdate(
            req.params.userId,
            { $set: updatedUser },
            { new: true }
        );

        res.status(200).json({
            sucess: true,
            message: "User has been sucessfully updated...",
            finalUser,
        });
    } catch (error) {
        if (error.name === "CastError" && error.kind === "ObjectId") {
            return res.status(404).json({
                success: false,
                error: `User not found with id: ${req.params.userId}`,
            });
        }

        console.log(
            `Some Internal server error occurs while Updating User with: ${error}`
        );
        return res.status(500).json({
            sucess: false,
            error: "Some Internal Server error occurs while Updating User...",
        });
    }
};

// Handlig the DeleteUser Action
const DeleteUser = async (req, res) => {
    try {
        const User = await SignUpModel.findById(req.params.userId);
        // If the user doesn't exists
        if (!User) {
            return res.status(400).json({
                sucess: false,
                error: `User  dosen't exists with this id: ${req.params.userId} `,
            });
        }

        // If the user wants to delete the account of another user
        if (req.user.id.toString() !== req.params.userId) {
            return res.status(400).json({ sucess: false, error: "Not allowed..." });
        }
        // deleting the user 
        await SignUpModel.findByIdAndDelete(req.user.id);
        return res.status(200).json({sucess: true, message: `User with id: ${req.params.userId} has been sucessfully deleted..`})

    } catch (error) {
        console.log(
            `Some Internal Server error occurs while Deleting user with: ${error}`
        );
        return res.status(500).json({
            sucess: false,
            error: "Some Internal Server error occurs while Deleting user...",
        });
    }
};


 

export { Login, SignUp, GetUser, UpdateUser, DeleteUser };
