# Outbound GTM Blueprint Generator

How the "Outbound GTM Blueprint Generator" resource works, and how to set it up.

## Flow

```
Resource form (BlueprintGeneratorForm.jsx)
        │  POST /api/blueprint  (JSON of the 13 answers)
        ▼
src/app/api/blueprint/route.js
        │  1. fetchSiteText()  → reads prospect site + competitor site → plain text
        │  2. generateBlueprint() → Claude returns strict JSON, flattened to
        │                            { "section.key": "value" }
        │  3. createBlueprintDoc() → copies the template Doc, replaceAllText on
        │                            every {{section.key}}, shares link-viewable
        ▼
Returns { documentUrl } → form shows "Open your blueprint"
```

## Files

| File | Role |
| --- | --- |
| `src/lib/blueprint/prompt.js` | The strategist system prompt + `{{placeholder}}` substitution |
| `src/lib/blueprint/fetchSite.js` | Fetch a URL and reduce it to plain text (never throws) |
| `src/lib/blueprint/generate.js` | Calls the LLM (OpenRouter / GPT-4o), parses JSON, flattens to dotted keys |
| `src/lib/blueprint/googleDoc.js` | Copies the template, replaces placeholders, returns the URL |
| `src/app/api/blueprint/route.js` | Orchestrates the three steps |
| `src/components/site/BlueprintGeneratorForm.jsx` | The client form + loading/error/done states |
| `scripts/get-google-refresh-token.mjs` | One-time helper to obtain the Google OAuth refresh token |

## Environment variables

See `.env.local.example`. Required: `OPENROUTER_API_KEY`, `GOOGLE_OAUTH_CLIENT_ID`,
`GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_OAUTH_REFRESH_TOKEN`, `GOOGLE_DOCS_TEMPLATE_ID`.
Optional: `BLUEPRINT_MODEL` (default `openai/gpt-4o`), `GOOGLE_DRIVE_FOLDER_ID`.

## Google setup (one time)

Generated docs are created in the Google account you consent with, so all
blueprints land in **your own Drive**.

1. In Google Cloud, create a project → enable **Google Docs API** and **Google Drive API**.
2. Create an **OAuth 2.0 Client ID** (type "Desktop app" is simplest; "Web application" also
   works but you must add `http://localhost:5175/oauth2callback` as an authorized redirect URI).
3. Put the client ID/secret in `.env.local` as `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET`.
4. If your project's OAuth consent screen is in "Testing", add your Google account as a **test user**.
5. Run `node scripts/get-google-refresh-token.mjs`, open the printed URL, approve, and paste the
   returned `GOOGLE_OAUTH_REFRESH_TOKEN` into `.env.local`.
6. Put your branded template Doc's ID (`docs.google.com/document/d/<ID>/edit`) in `GOOGLE_DOCS_TEMPLATE_ID`.

## Placeholders to put in the template Doc

Every value the model writes maps to a dotted placeholder. Type these tokens
verbatim (including the double braces) wherever you want that piece of content in
the branded document. Matching is case-sensitive.

### Executive summary
- `{{executive_summary.callout}}`
- `{{executive_summary.context}}`
- `{{executive_summary.finding_1}}`
- `{{executive_summary.finding_2}}`
- `{{executive_summary.finding_3}}`
- `{{executive_summary.finding_4}}`

### ICP — Segment A
- `{{icp.intro}}`
- `{{icp.segment_a_name}}`
- `{{icp.segment_a_stage}}`
- `{{icp.segment_a_team}}`
- `{{icp.segment_a_decision_makers}}`
- `{{icp.segment_a_where}}`
- `{{icp.segment_a_signals}}`
- `{{icp.segment_a_disqualifiers}}`

### ICP — Segment B
- `{{icp.segment_b_name}}`
- `{{icp.segment_b_stage}}`
- `{{icp.segment_b_team}}`
- `{{icp.segment_b_decision_makers}}`
- `{{icp.segment_b_where}}`
- `{{icp.segment_b_signals}}`
- `{{icp.segment_b_disqualifiers}}`

### Messaging angles (1–5)
- `{{messaging.intro}}`
- `{{messaging.angle_1_name}}` · `{{messaging.angle_1_segment}}` · `{{messaging.angle_1_mechanism}}`
- `{{messaging.angle_2_name}}` · `{{messaging.angle_2_segment}}` · `{{messaging.angle_2_mechanism}}`
- `{{messaging.angle_3_name}}` · `{{messaging.angle_3_segment}}` · `{{messaging.angle_3_mechanism}}`
- `{{messaging.angle_4_name}}` · `{{messaging.angle_4_segment}}` · `{{messaging.angle_4_mechanism}}`
- `{{messaging.angle_5_name}}` · `{{messaging.angle_5_segment}}` · `{{messaging.angle_5_mechanism}}`

### Signals (the "· separated" bullet blocks)
- `{{signals.segment_a_signals}}`
- `{{signals.segment_b_signals}}`

> Note: `icp.segment_a_signals` and `signals.segment_a_signals` are **different**
> placeholders. The `icp.*` ones are the comma-separated buying signals inside
> the ICP table; the `signals.*` ones are the standalone signals section with
> `·` separators. Use whichever the layout calls for.

### Campaign strategy
- `{{campaign_strategy.intro}}`
- `{{campaign_strategy.volume_philosophy}}`
- `{{campaign_strategy.campaign_1_name}}` · `{{campaign_strategy.campaign_1_focus}}` · `{{campaign_strategy.campaign_1_description}}`
- `{{campaign_strategy.campaign_2_name}}` · `{{campaign_strategy.campaign_2_focus}}` · `{{campaign_strategy.campaign_2_description}}`
- `{{campaign_strategy.campaign_3_name}}` · `{{campaign_strategy.campaign_3_focus}}` · `{{campaign_strategy.campaign_3_description}}`
- `{{campaign_strategy.volume_recommendation}}`
- `{{campaign_strategy.infra_scale_note}}`
- `{{campaign_strategy.cadence_recommendation}}`

## Notes

- Generated docs are shared **anyone-with-link (viewer)** so the prospect can open them.
- The API route runs on the Node runtime (`export const runtime = "nodejs"`).
- If a site can't be fetched, generation still proceeds using the form answers alone.
- Blueprint content quality depends on the model; override with `BLUEPRINT_MODEL` if needed.
