import jwt from "jsonwebtoken";
import User from "../models/usersSchema.js";

export const auth = async (req, res, next) => {
  //authorization is a process of checking or verifying user is authenticated or not.
  try {
    const token = req.headers.token;
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (payload) {
      // {_id: "dsfsea4w4222",email:"test123@gmail.com"}
      const user = await User.findById(payload._id);
      console.log(user);
      req.user = user;

      next(); // forwarding request to next middleware
    }
  } catch (err) {
    next(err);
  }
};
