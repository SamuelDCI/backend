import mongoose from "mongoose";
import User from "../models/usersSchema.js";
import {faker} from "@faker-js/faker";

await mongoose.connect("mongodb://127.0.0.1:27017/recordShop");
console.log("external file is connected 🙄");

const generateUsers = async () => {
  for (let i = 0; i < 10; i++) {
    await User.create({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
  return;
};

generateUsers().then(() => {
  mongoose.connection.close();
});
