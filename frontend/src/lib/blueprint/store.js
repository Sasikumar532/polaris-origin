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
