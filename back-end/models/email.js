import mongoose from "mongoose";


const emailSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    senderEmail: { type: String, required: true },
    subject: { type: String, required: true },
    preview: { type: String, required: true },
    time: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    isPinned: { type: Boolean, default: false },
    hasAttachment: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["inbox", "archived", "deleted"],
      default: "inbox",
    },
    attachments: [
      {
        filename: { type: String, required: true },
        url: { type: String, required: true }, // link al archivo (ej: S3/Cloudinary)
        mimetype: { type: String, required: true },
        size: { type: Number }, // en bytes
      },
    ],
  },
  { timestamps: true }
);

export const Email = mongoose.model("Email", emailSchema);
