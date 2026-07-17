// Mongoose schema + model for a Blueprint Generator submission.
// One document per form submission; the background job fills in the generated
// Google Doc link (or an error) and flips `status`.

import mongoose from "mongoose";

const { Schema } = mongoose;

const BlueprintSubmissionSchema = new Schema(
  {
    // ── Prospect answers (from the 13-question form) ──
    company_name: { type: String, required: true, trim: true },
    website_url: { type: String, required: true, trim: true },
    offer_description: { type: String, required: true },
    industries_list: { type: String, required: true },
    best_fit_industry: { type: String, required: true },
    pain_points: { type: String, required: true },
    value_delivered: { type: String, required: true },
    geography: { type: String, required: true },
    capacity: { type: String, required: true },
    aov: { type: String, required: true },
    competitor_name: { type: String, required: true },
    competitor_website: { type: String, default: "" },
    qualifying_criteria: { type: String, required: true },
    additional_notes: { type: String, default: "" },

    // ── Processing state (managed by the background job) ──
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
      index: true,
    },
    documentUrl: { type: String, default: null },
    viewUrl: { type: String, default: null },
    error: { type: String, default: null },
  },
  { timestamps: true, collection: "blueprint_submissions" }
);

// Reuse the compiled model across hot-reloads to avoid OverwriteModelError.
export default mongoose.models.BlueprintSubmission ||
  mongoose.model("BlueprintSubmission", BlueprintSubmissionSchema);
