import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  role: { type: String, enum: ["admin", "user"], default: "user" }, // This is done as an
});

const User = model("User", userSchema);

export default User;
