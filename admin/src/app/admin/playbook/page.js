import PlaybookLeadsTable from "@/components/admin/PlaybookLeadsTable";

export const dynamic = "force-dynamic";

// Auth + sidebar are handled by the /admin layout.
export default function PlaybookLeadsPage() {
  return <PlaybookLeadsTable />;
}
