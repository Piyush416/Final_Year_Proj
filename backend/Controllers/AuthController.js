import { User } from "../Models/Registration.js";
import {ApiResponse} from "../Utils/ApiResponse.js";
import bcrypt from "bcrypt";
import { generateToken, verifyToken,decodeToken } from "../Utils/jwt.js";

export const Registration = async (req,res) => {
    try {
       const {FirstName,LastName,EnrollmentNumber,mobileNumber,primaryEmail,secondaryEmail,isEmailVerified,role,password,passingYear} = req.body

       if(!FirstName|| !LastName || !EnrollmentNumber || !mobileNumber || !passingYear || !primaryEmail || !secondaryEmail || isEmailVerified === undefined || !password){
        return res
        .status(400)
        .json(new ApiResponse(400,{message:"All fields are required"}, "Bad Request"));
       }

       if(primaryEmail === secondaryEmail){
        return res
        .status(500)
        .json(new ApiResponse(500,{message:"Primary and Secondary Email cannot be same"}, "Internal server error"));
        }
       
        if (!secondaryEmail.toLowerCase().includes("@paruluniversity.ac.in")) {
            return res
            .status(500)
            .json(new ApiResponse(500,{message:"Secondary Email should include be of Parul University"}, "Internal server error"));
        }
      

        const existingUser = await User.findOne({
            $or: [
                { primaryEmail },
                { secondaryEmail }
            ]
        });

        if (existingUser) {
            return res
                .status(400)
                .json(new ApiResponse(400, { message: "Email already exists" }, "Bad Request"));
        }

        const hashedPassword = await bcrypt.hash(password, 10); 

        const user = new User({
            FirstName,
            LastName,
            EnrollmentNumber,
            mobileNumber,
            primaryEmail,
            secondaryEmail,
            hashpassword: hashedPassword,
            isEmailVerified,
            role,
            passingYear
        });

        const result = await user.save();

        return res.status(200).json(new ApiResponse(200, result, "Registration successful"));

    }catch (error) {
        console.log("Error:", error);
        return res
            .status(500)
            .json(new ApiResponse(500, null, "Internal server error"));
    }
}

export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json(
          new ApiResponse(400, { message: "Email and Password are required" }, "Bad Request")
        );
      }
  
      // Find user by primaryEmail or secondaryEmail
      const user = await User.findOne({
        $or: [{ primaryEmail: email }, { secondaryEmail: email }]
      });
  
      if (!user) {
        return res.status(404).json(
          new ApiResponse(404, { message: "User not found" }, "Not Found")
        );
      }

      
      
      
      // Compare password (fix: use user.password not hashpassword)
      const isPasswordValid = await bcrypt.compare(password, user.hashpassword);
      if (!isPasswordValid) {
        return res.status(401).json(
          new ApiResponse(401, { message: "Invalid Password" }, "Unauthorized")
        );
      }

      // if(user.isEmailVerified === false){

      // }
  

      // Check if user is verified
      const result = {
        id: user._id,
        EnrollmentNumber : user.EnrollmentNumber,
        isAlumni : parseInt(user.passingYear) < new Date().getFullYear() ? true : false,
        role:user.role === 'user' ? parseInt(user.passingYear) < new Date().getFullYear() ? "Alumni" : user.role : user.role,
        email: user.primaryEmail,
        mobileNumber: user.isEmailVerified,
      }

      // Generate JWT token
      const token = generateToken(user._id, user.role);
  
      //  Set token as HTTP-only cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });
  
      return res.status(200).json(
        new ApiResponse(200, { message: "Login successful", result }, "Login Success")
      );
    } catch (error) {
      console.log("Error in Login:", error);
      return res.status(500).json(
        new ApiResponse(500, null, "Internal Server Error")
      );
    }
  };
  

  export const checkCurrentUser = async (req, res) => {
    try {
      console.log("Checking current user");

      console.log(req.cookies.token)

      //const decoded = req.cookies.token;
      // if (!decoded) {
      //   return res.status(401).json(
      //     new ApiResponse(401, { message: "Unauthorized" }, "Unauthorized")
      //   );
      // }
      //console.log(verifyToken(req.cookies.token))
      if(verifyToken(req.cookies.token) === false){
        console.log("Token is not valid")
        return res.status(401).json(
          new ApiResponse(401, { message: "Unauthorized" }, "Unauthorized")
        );
      }


      // Decode the token to get user ID


      const decoded = decodeToken(req.cookies.token);
      if (!decoded) {
        return res.status(401).json(
          new ApiResponse(401, { message: "Unauthorized" }, "Unauthorized")
        );
      }

      // Find user by ID
      const user = await User.findById(decoded).select("-hashpassword");

      if(!user){
        return res.status(404).json(
          new ApiResponse(404, { message: "User not found" }, "Not Found")
        );
      }

      const result = {
        EnrollmentNumber : user.EnrollmentNumber,
        isAlumni : parseInt(user.passingYear) < new Date().getFullYear() ? true : false,
        role:user.role === 'user' ? parseInt(user.passingYear) < new Date().getFullYear() ? "Alumni" : user.role : user.role,
        email: user.primaryEmail,
        mobileNumber: user.isEmailVerified,
      }

        return res.status(200).json(
          new ApiResponse(200, { message: "User found", result }, "User Found")
        );
      
      
    } catch (error) {
      console.log("Error in Login:", error);
      return res.status(500).json(
        new ApiResponse(500, null, "Internal Server Error")
      );
    }
  }