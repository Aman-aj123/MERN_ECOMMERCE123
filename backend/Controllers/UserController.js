import SignUpModel from "../Models/SignUp.js";


// Handling the SignUp Action
const SignUp = async (req, res) => {
    console.log(req.body)
    const { name, email, password } = req.body;
    try {
        // Creating the user
        await SignUpModel.create({
            name: name,
            email: email,
            password: password
        });
        res.status(200).json({sucess: true, message: `SignUp Sucessfully with '${name}' `});

    } catch(error){
        // If the error occurs
        console.log(`Some Error Occurs while creating user.. with: ${error}`)
        res.status(500).json({sucess: false, error: "Some Internal Server Error Occurs While SignUp.."});
    }
};



// Handling the Login Action
const Login = async (req, res) => {
res.send("Welcome to the login")
}



export { Login, SignUp };
