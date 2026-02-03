import { Suspense } from "react";
import { DestinationSearch } from "@/components/filters/destination-search";
import { DestinationResults } from "@/components/destination-results";

export default function DestinationsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <p className="text-sm text-ink-2">土地与故事</p>
        <h1 className="font-serif-cn text-3xl text-ink sm:text-4xl">目的地</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-2">它们或许没有喧闹的景点，却有清晰的生活节奏。试着以关键词搜索，你会看见不同肌理。</p>
      </div>
      <Suspense fallback={<p className="text-sm text-ink-2">正在载入搜索控件...</p>}>
        <DestinationSearch />
      </Suspense>
      <Suspense fallback={<p className="text-sm text-ink-2">正在载入搜索结果...</p>}>
        <DestinationResults />
      </Suspense>
    </div>
  );
}
