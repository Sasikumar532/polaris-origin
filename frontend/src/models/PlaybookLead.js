// A lead captured from the Cold Email Infrastructure Playbook download form.

import mongoose from "mongoose";

const { Schema } = mongoose;

const PlaybookLeadSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, default: "" },
    company: { type: String, required: true, trim: true },
    role: { type: String, default: "" },
    // Whether the playbook PDF was successfully emailed to the lead.
    emailSent: { type: Boolean, default: false },
    emailSentAt: { type: Date, default: null },
  },
  { timestamps: true, collection: "playbook_leads" }
);

export default mongoose.models.PlaybookLead ||
  mongoose.model("PlaybookLead", PlaybookLeadSchema);
