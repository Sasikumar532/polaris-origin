import { notFound } from "next/navigation";
import ResourceDetail from "@/views/ResourceDetail";
import { RESOURCES, getResource } from "@/data/resources";

export function generateStaticParams() {
  return RESOURCES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) return {};
  return {
    title: `${resource.title} — Polaris Origin`,
    description: resource.excerpt,
  };
}

export default async function ResourcePage({ params }) {
  const { slug } = await params;
  const resource = getResource(slug);
  if (!resource) notFound();
  return <ResourceDetail resource={resource} />;
}
