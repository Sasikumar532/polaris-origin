// Reads/deletes Cold Email Playbook leads for the admin panel.

import { connectDb } from "@/lib/mongoose";
import PlaybookLead from "@/models/PlaybookLead";

export async function getPlaybookLeads(limit = 500) {
  await connectDb();
  return PlaybookLead.find({}).sort({ createdAt: -1 }).limit(limit).lean();
}

export async function deletePlaybookLead(id) {
  await connectDb();
  const res = await PlaybookLead.findByIdAndDelete(id);
  return Boolean(res);
}
