// Service layer for Blueprint Generator submissions — the only place the API
// and background job touch the database.

import { connectDb } from "@/lib/mongoose";
import BlueprintSubmission from "@/models/BlueprintSubmission";

// Persist the raw submission immediately (status "processing") and return its id.
export async function saveSubmission(data) {
  await connectDb();
  const doc = await BlueprintSubmission.create(data);
  return doc._id;
}

// Attach the generated Google Doc once the background job finishes.
export async function markSubmissionComplete(id, { documentUrl, viewUrl }) {
  await connectDb();
  await BlueprintSubmission.findByIdAndUpdate(id, {
    status: "completed",
    documentUrl,
    viewUrl,
  });
}

// Record a failure so a submission is never silently lost.
export async function markSubmissionFailed(id, errorMessage) {
  await connectDb();
  await BlueprintSubmission.findByIdAndUpdate(id, {
    status: "failed",
    error: errorMessage,
  });
}

// Flip a submission back to "processing" (used when the admin re-triggers it).
export async function markSubmissionProcessing(id) {
  await connectDb();
  await BlueprintSubmission.findByIdAndUpdate(id, {
    status: "processing",
    error: null,
  });
}

// List submissions, newest first, as plain objects for the admin dashboard.
export async function getSubmissions(limit = 200) {
  await connectDb();
  return BlueprintSubmission.find({})
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
}

// Fetch a single submission as a plain object (or null).
export async function getSubmissionById(id) {
  await connectDb();
  return BlueprintSubmission.findById(id).lean();
}
