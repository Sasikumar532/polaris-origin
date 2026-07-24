// Persists Cold Email Playbook download leads.

import { connectDb } from "@/lib/mongoose";
import PlaybookLead from "@/models/PlaybookLead";

export async function savePlaybookLead(data) {
  await connectDb();
  const doc = await PlaybookLead.create({
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    company: data.company,
    role: data.role || "",
  });
  return doc._id;
}

// Flip emailSent to true once the playbook PDF has been delivered.
export async function markPlaybookEmailSent(id) {
  await connectDb();
  await PlaybookLead.findByIdAndUpdate(id, {
    emailSent: true,
    emailSentAt: new Date(),
  });
}
