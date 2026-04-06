import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName : {type: String, required: true},
  email: { type: String, required: true}, 
  password: {type : String, required: true},
  isAdmin: {type: Boolean, default: false}
});

// Prevent model overwrite error in Next.js
export default mongoose.models.User || mongoose.model("User", UserSchema);