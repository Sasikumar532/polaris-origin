// The actual blueprint generation pipeline: read the prospect's site, generate
// the strategist JSON, fill the Google Doc, and record the result on the stored
// submission. Shared by the public form (background) and the admin panel button.

import { fetchSiteText } from "./fetchSite";
import { generateBlueprint } from "./generate";
import { createBlueprintDoc } from "./googleDoc";
import { markSubmissionComplete, markSubmissionFailed } from "./store";

export async function processBlueprint(submissionId, body) {
  try {
    const [websiteContent, competitorContent] = await Promise.all([
      fetchSiteText(body.website_url),
      fetchSiteText(body.competitor_website),
    ]);

    const values = {
      ...body,
      website_content: websiteContent || "(could not be fetched automatically)",
      competitor_website_content:
        competitorContent || "(not provided or could not be fetched)",
    };

    const { flat } = await generateBlueprint(values);
    const doc = await createBlueprintDoc({ flat, companyName: body.company_name });

    await markSubmissionComplete(submissionId, {
      documentUrl: doc.editUrl,
      viewUrl: doc.viewUrl,
    });
    return { ok: true, documentUrl: doc.editUrl, viewUrl: doc.viewUrl };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Blueprint generation failed:", err);
    const message = String(err?.message || err);
    await markSubmissionFailed(submissionId, message).catch(() => {});
    return { ok: false, error: message };
  }
}
