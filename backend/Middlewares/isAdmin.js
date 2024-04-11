import SignUpSchema from "../Models/SignUp.js";

const isAdmin = async (req, res, next) => {
    // Checking if the role of the user is admin or not 
    try {

        const User = await SignUpSchema.findById(req.user.id);

        if (User && User.role === "admin") {
            next();
        } else {
            return res.status(400).json({ sucess: false, error: "Not allowed..." });
        }

    } catch (error) {
        console.log(`Some Internal server error occurw while checking isAdmin with: ${error}`);
        return res.status(500).json({ sucess: false, error: "Some Internal server occurs while checking isAdmin.." });
    }

};

export default isAdmin;