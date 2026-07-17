// Copies the branded Google Doc template, replaces its {{PLACEHOLDER}} tokens
// with generated content, makes it link-viewable, and returns the document URL.
// Uses a Google OAuth refresh token (docs created in the user's own Drive).

import { google } from "googleapis";

// Maps each template token (as it appears in the branded Doc) to the flattened
// blueprint key it should be filled from. COMPANY_NAME and DATE are filled from
// the submission/runtime rather than the model output.
const PLACEHOLDER_MAP = {
  EXEC_CALLOUT: "executive_summary.callout",
  EXEC_CONTEXT: "executive_summary.context",
  EXEC_FINDING_1: "executive_summary.finding_1",
  EXEC_FINDING_2: "executive_summary.finding_2",
  EXEC_FINDING_3: "executive_summary.finding_3",
  EXEC_FINDING_4: "executive_summary.finding_4",

  ICP_INTRO: "icp.intro",
  ICP_A_NAME: "icp.segment_a_name",
  ICP_A_STAGE: "icp.segment_a_stage",
  ICP_A_TEAM: "icp.segment_a_team",
  ICP_A_DECISION_MAKERS: "icp.segment_a_decision_makers",
  ICP_A_WHERE: "icp.segment_a_where",
  ICP_A_SIGNALS: "icp.segment_a_signals",
  ICP_A_DISQUALIFIERS: "icp.segment_a_disqualifiers",
  ICP_B_NAME: "icp.segment_b_name",
  ICP_B_STAGE: "icp.segment_b_stage",
  ICP_B_TEAM: "icp.segment_b_team",
  ICP_B_DECISION_MAKERS: "icp.segment_b_decision_makers",
  ICP_B_WHERE: "icp.segment_b_where",
  ICP_B_SIGNALS: "icp.segment_b_signals",
  ICP_B_DISQUALIFIERS: "icp.segment_b_disqualifiers",

  MSG_INTRO: "messaging.intro",
  MSG_1_NAME: "messaging.angle_1_name",
  MSG_1_SEGMENT: "messaging.angle_1_segment",
  MSG_1_MECHANISM: "messaging.angle_1_mechanism",
  MSG_2_NAME: "messaging.angle_2_name",
  MSG_2_SEGMENT: "messaging.angle_2_segment",
  MSG_2_MECHANISM: "messaging.angle_2_mechanism",
  MSG_3_NAME: "messaging.angle_3_name",
  MSG_3_SEGMENT: "messaging.angle_3_segment",
  MSG_3_MECHANISM: "messaging.angle_3_mechanism",
  MSG_4_NAME: "messaging.angle_4_name",
  MSG_4_SEGMENT: "messaging.angle_4_segment",
  MSG_4_MECHANISM: "messaging.angle_4_mechanism",
  MSG_5_NAME: "messaging.angle_5_name",
  MSG_5_SEGMENT: "messaging.angle_5_segment",
  MSG_5_MECHANISM: "messaging.angle_5_mechanism",

  SIG_A: "signals.segment_a_signals",
  SIG_B: "signals.segment_b_signals",

  CAMP_INTRO: "campaign_strategy.intro",
  CAMP_VOLUME_PHILOSOPHY: "campaign_strategy.volume_philosophy",
  CAMP_1_NAME: "campaign_strategy.campaign_1_name",
  CAMP_1_FOCUS: "campaign_strategy.campaign_1_focus",
  CAMP_1_DESC: "campaign_strategy.campaign_1_description",
  CAMP_2_NAME: "campaign_strategy.campaign_2_name",
  CAMP_2_FOCUS: "campaign_strategy.campaign_2_focus",
  CAMP_2_DESC: "campaign_strategy.campaign_2_description",
  CAMP_3_NAME: "campaign_strategy.campaign_3_name",
  CAMP_3_FOCUS: "campaign_strategy.campaign_3_focus",
  CAMP_3_DESC: "campaign_strategy.campaign_3_description",
  CAMP_VOLUME: "campaign_strategy.volume_recommendation",
  CAMP_INFRA_SCALE: "campaign_strategy.infra_scale_note",
  CAMP_CADENCE: "campaign_strategy.cadence_recommendation",
};

function getAuth() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(
      "GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN are not set. Run `node scripts/get-google-refresh-token.mjs` once to obtain the refresh token."
    );
  }
  // Long-lived refresh token from a one-time consent; googleapis mints and
  // refreshes short-lived access tokens from it automatically.
  const oauth2 = new google.auth.OAuth2(clientId, clientSecret);
  oauth2.setCredentials({ refresh_token: refreshToken });
  return oauth2;
}

// flat: { "executive_summary.callout": "…", … } from flattenBlueprint().
export async function createBlueprintDoc({ flat, companyName }) {
  const templateId = process.env.GOOGLE_DOCS_TEMPLATE_ID;
  if (!templateId) {
    throw new Error("GOOGLE_DOCS_TEMPLATE_ID is not set.");
  }
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID; // optional

  const auth = getAuth();
  const drive = google.drive({ version: "v3", auth });
  const docs = google.docs({ version: "v1", auth });

  const stamp = new Date().toISOString().slice(0, 10);
  const name = `${companyName || "Prospect"} — Outbound GTM Blueprint (${stamp})`;

  // 1. Copy the template.
  const copy = await drive.files.copy({
    fileId: templateId,
    supportsAllDrives: true,
    requestBody: {
      name,
      ...(folderId ? { parents: [folderId] } : {}),
    },
  });
  const documentId = copy.data.id;

  // 2. Build the replacement set from the template token → blueprint-key map,
  //    plus the runtime-filled COMPANY_NAME and DATE tokens.
  const tokenValues = {
    COMPANY_NAME: companyName || "",
    DATE: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
  for (const [token, flatKey] of Object.entries(PLACEHOLDER_MAP)) {
    tokenValues[token] = flat[flatKey] ?? "";
  }

  const requests = Object.entries(tokenValues).map(([token, value]) => ({
    replaceAllText: {
      containsText: { text: `{{${token}}}`, matchCase: true },
      replaceText: value,
    },
  }));

  if (requests.length > 0) {
    await docs.documents.batchUpdate({
      documentId,
      requestBody: { requests },
    });
  }

  // 3. Make it viewable by anyone with the link so the prospect can open it.
  await drive.permissions.create({
    fileId: documentId,
    supportsAllDrives: true,
    requestBody: { role: "reader", type: "anyone" },
  });

  return {
    documentId,
    editUrl: `https://docs.google.com/document/d/${documentId}/edit`,
    viewUrl: `https://docs.google.com/document/d/${documentId}/view`,
  };
}
