import { Topbar } from "@/components/Topbar";
import { ResultExperience } from "@/components/ResultExperience";

export default function UnitResultPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <main className="shell">
      <Topbar />
      <section className="page">
        <ResultExperience searchParams={searchParams} />
      </section>
    </main>
  );
}
