import { FileText, Calculator } from "lucide-react";

// Single source of truth for the Resources list and each detail page.
export const RESOURCES = [
  {
    slug: "outbound-gtm-blueprint-generator",
    icon: FileText,
    type: "generator",
    title: "Outbound GTM Blueprint Generator",
    excerpt:
      "Answer a few questions about your business and we'll build a tailored Outbound GTM blueprint — the ICP, targeting and offer positioning we'd run for you.",
    readingTime: "5 min to complete",
  },
  {
    slug: "outbound-gtm-roi-calculator",
    icon: Calculator,
    type: "calculator",
    title: "GTM Cost & ROI Calculator",
    excerpt:
      "Model your outbound engine end to end — infrastructure, spend, funnel conversion and client economics. Change any input and every figure recalculates instantly.",
    readingTime: "Interactive tool",
  },
];

export function getResource(slug) {
  return RESOURCES.find((r) => r.slug === slug);
}
