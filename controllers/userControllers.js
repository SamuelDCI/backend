// Import the User model
import User from "../models/usersSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//http is a stateless protocol
//every request for server is unique

// Define the controller for user login
export const login = async (req, res, next) => {
  /* 
    "email":"test@gmail.com",
    "password":"12345" */
  try {
    const foundUser = await User.findOne({
      email: req.body.email,
    });
    /* 
    {
      "firstName": "Syed",
    "lastName": "Naqvi",
    "email": "test@gmail.com",
    "password": "$2b$10$nR/cAZRI7b2z5KOV2ZAZF..dFg97jVz2AUMlOC2je94D9n.lvjnjq",
    } */

    if (foundUser) {
      //"12345"  === "$2b$10$nR/cAZRI7b2z5KOV2ZAZF..dFg97jVz2AUMlOC2je94D9n.lvjnjq"
      const check = await bcrypt.compare(req.body.password, foundUser.password);

      //authentication process
      // jwt.sign(payload,secretkey,options)
      if (check) {
        const token = jwt.sign({ _id: foundUser._id }, process.env.SECRET_KEY, {
          issuer: "Naqvi",
          expiresIn: "24h",
        });
        console.log(token);
        // Use the SECRECT_KEY to verify
        res.header("token", token).send({ success: true, data: foundUser }); // sending token to the header
        /*  res.cookie("token", token).send({msg: "welcome back", foundUser}); // sending token to the cookie
         res.send({msg: "welcome back", foundUser, token}); */ // sending token to the body
      } else {
        res
          .status(401)
          .send({ success: false, message: "password doesn't match!" });
      }
    } else {
      // if there is no user found, then send this response
      res.send({ success: false, message: "Make sure your email is correct!" });
    }
  } catch (error) {
    next(error);
  }
};

// Define the controller for user registration
export const register = async (req, res, next) => {
  try {
    //   "hello" E4wnd46S
    // "@h§4jkjgfjHello"
    /* const salt = bcrypt.genSaltSync(10)
    console.log(salt)
    const hashedPassword = await bcrypt.hash(req.body.password,salt) */
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    next(error);
  }
};

// Define the controller for updating user information
export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(203).send(user);
  } catch (error) {
    next(error);
  }
};

// Define the controller for deleting a user
// /api/users/delete/awjg4qk3j4g24252j45kj24g5kj3
export const deleteUser = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);

    if (result) {
      res.status(200).send({ message: "User deleted" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

// Define the controller for getting all allUsers
export const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find({});
    res.status(200).send(allUsers);
  } catch (error) {
    next(error);
  }
};
