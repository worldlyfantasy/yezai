import { creators, destinations } from "@/data";
import { filterCreators } from "@/data/helpers";
import type { TravelStyle } from "@/data";
import { CreatorCard } from "@/components/creator-card";
import { CreatorFilterBar } from "@/components/filters/creator-filter";

const travelStyles = Array.from(new Set(creators.flatMap((creator) => creator.tags))) as TravelStyle[];

export default function CreatorsPage({ searchParams }: { searchParams: { destination?: string; style?: TravelStyle } }) {
  const filtered = filterCreators({ destination: searchParams.destination, style: searchParams.style });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <p className="text-sm text-ink-2">真实在场 · 创作者档案</p>
        <h1 className="font-serif-cn text-4xl text-ink">发现创作者</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          他们有自己的节奏与价值观，我们负责透明呈现。选择目的地或旅行风格，即可筛选合适的同行者。
        </p>
      </div>
      <CreatorFilterBar destinations={destinations} styles={travelStyles} />
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无符合条件的创作者。</p>}
    </div>
  );
}
