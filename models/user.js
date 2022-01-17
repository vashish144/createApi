import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
});

const User = mongoose.model("user", userSchema);

export default User;
