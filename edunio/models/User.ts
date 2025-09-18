import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
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
      type: String,
      required: true,
    },
    isMentor: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: "",
    },
    subjects: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    education: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    pricePerHour: {
      type: String,
      default: "",
    },
    availability: {
      monday: { type: String, default: "" },
      tuesday: { type: String, default: "" },
      wednesday: { type: String, default: "" },
      thursday: { type: String, default: "" },
      friday: { type: String, default: "" },
      saturday: { type: String, default: "" },
      sunday: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

export interface IUser {
  _id: string;
  name: string;
  email: string;
  isMentor: boolean;
  avatar: string;
  subjects: string;
  description: string;
  education: string;
  experience: string;
  pricePerHour: string;
  availability: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export default mongoose.models.User || mongoose.model("User", UserSchema);
