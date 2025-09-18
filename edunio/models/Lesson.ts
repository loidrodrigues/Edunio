import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LessonRequest",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    dateTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    meetingLink: {
      type: String,
      default: "",
    },
    studentConfirmed: {
      type: Boolean,
      default: false,
    },
    mentorConfirmed: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rating",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
