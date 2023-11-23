import { body, validationResult } from "express-validator";
import { capitalize } from "../helpers/index.js";
import User from "../models/usersSchema.js";

export const userValidationsTest = [
  body("email").isEmail().withMessage("Please enter an email"),
  body("name")
    .isAlpha()
    .withMessage("Please enter a name in alpha without numbers"),
  body("password")
    .exists()
    .isLength({ min: 3 })
    .withMessage("minimum password  is 3 characters")
    .isLength({ max: 10 })
    .withMessage("maximum password is 10 characters"),
  body("firstName").exists().trim().isAlphanumeric(),
  (req, res, next) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      return res.send(req.body);
    }
    res.send(errors);
  },
];

export const userRegisterValidation = [
  body("email")
    .exists()
    .withMessage("you have to pass an email")
    .isEmail()
    .withMessage("you have to pass an accurate email")
    .trim()
    // to clean the email before it's sent to db
    .normalizeEmail(),
  // to prevent save the same email , to be sure we save unique email
  // .custom(async (value, {req}) => {
  //   const userFound = await User.findOne({email: req.body.email});
  //   if (userFound) {
  //     throw new Error(`${value} is already being used`);
  //   } else {
  //     return true;
  //   }
  // })
  body("password")
    .exists()
    .trim()
    .isLength({ min: 8, max: 16 })
    .withMessage(" password should between 8 and 16 characters")
    // the password should contain char and numbers
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i")
    .withMessage(" password should include number and alpha characters"),

  body("firstName").exists().trim().escape().isAlpha(),
  body("lastName").exists().trim().isAlpha(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      req.body.firstName = capitalize(req.body.firstName);
      req.body.lastName = capitalize(req.body.lastName);
      next();
    } else {
      res.status(400).send(errors);
    }
  },
];
