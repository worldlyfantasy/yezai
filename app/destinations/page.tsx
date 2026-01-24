import { filterDestinations } from "@/data/helpers";
import { DestinationCard } from "@/components/destination-card";
import { DestinationSearch } from "@/components/filters/destination-search";

export default function DestinationsPage({ searchParams }: { searchParams: { q?: string } }) {
  const filtered = filterDestinations(searchParams.q);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <p className="text-sm text-ink-2">土地与故事</p>
        <h1 className="font-serif-cn text-4xl text-ink">目的地</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">它们或许没有喧闹的景点，却有清晰的生活节奏。试着以关键词搜索，你会看见不同肌理。</p>
      </div>
      <DestinationSearch />
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无匹配结果。</p>}
    </div>
  );
}
