import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    photo: { type: String },
  },
  { timestamps: true }
);

// prevent model overwrite in dev/hot-reload
delete mongoose.connection.models['User'];
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
