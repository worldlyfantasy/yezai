import { Suspense } from "react";
import { creators, destinations } from "@/data";
import type { TravelStyle } from "@/data";
import { CreatorFilterBar } from "@/components/filters/creator-filter";
import { CreatorResults } from "@/components/creator-results";

const travelStyles = Array.from(new Set(creators.flatMap((creator) => creator.tags))) as TravelStyle[];

export default function CreatorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <p className="text-sm text-ink-2">真实在场 · 创作者档案</p>
        <h1 className="font-serif-cn text-3xl text-ink sm:text-4xl">发现创作者</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">
          他们有自己的节奏与价值观，我们负责透明呈现。选择目的地或旅行风格，即可筛选合适的同行者。
        </p>
      </div>
      <Suspense fallback={<p className="text-sm text-ink-2">正在载入筛选控件...</p>}>
        <CreatorFilterBar destinations={destinations} styles={travelStyles} />
      </Suspense>
      <Suspense fallback={<p className="text-sm text-ink-2">正在载入筛选结果...</p>}>
        <CreatorResults />
      </Suspense>
    </div>
  );
}
