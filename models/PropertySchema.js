import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const propertySchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String },
    furnishing: { type: String },
    preference: { type: String },
    available_from: { type: String },
    isAvailable: { type: Boolean, default: true },
    rent: { type: Number, required: true },
    location: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, maxlength: 2000 },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);


delete mongoose.connection.models['Property'];
const Property =
  mongoose.models.Property || mongoose.model("Property", propertySchema);

export default Property;