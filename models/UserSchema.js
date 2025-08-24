import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: { type: String, enum: ["admin", "user"], default: "user" },
    photo: String,
  },
  { timestamps: true }
);

delete mongoose.connection.models['User'];
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
