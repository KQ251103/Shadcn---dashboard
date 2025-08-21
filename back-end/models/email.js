import mongoose from "mongoose";


const emailSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    senderEmail: { type: String, required: true },
    subject: { type: String, required: true },
    preview: { type: String, required: true },
    time:{ type: String, required: true },
    isRead: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
    hasAttachment: { type: Boolean, default: false },
    status: {
    type: String,
    enum: ["inbox", "archived", "deleted"],
    default: "inbox",
  }
}, { timestamps: true });

export const Email = mongoose.model("Email", emailSchema);