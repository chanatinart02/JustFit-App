import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  avatar: { type: String }, // URL of user's avatar
  gender: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  weight: {
    type: Number,
    required: false,
  },
  uid: {
    type: String,
    required: true,
    unique: true,
  },
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;
