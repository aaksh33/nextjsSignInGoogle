import mongoose from "mongoose";

// Define the User schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String, // Add password field
    required: false, // Optional for OAuth users
  },
  image: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the User model
const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;