import { Router } from "express";

import {
  deleteUser,
  getAllUsers,
  login,
  register,
  updateUser,
} from "../controllers/userControllers.js";
import {
  userRegisterValidation,
  //userValidationsTest,
} from "../middleware/validation.js";

import { auth } from "../middleware/authorization.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = Router();

// Route to create a new user
router.post("/login", login);

// Route to register a new user
router.post("/register", userRegisterValidation, register);

//router.post("/validation", userValidationsTest);

// Route to update a user by ID
router.patch("/update/:id",auth,isAdmin, updateUser);

// Route to delete an user by ID
router.delete("/delete/:id",auth,isAdmin,  deleteUser);

// Route to get all allUsers
router.get("/allUsers",auth, isAdmin, getAllUsers);

// Route to verify token
router.get("/verifytoken", auth, (req, res) => {
  res.send({success:true, data:req.user})
})

export default router;
