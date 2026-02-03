import { Suspense } from "react";
import { ideas } from "@/data";
import { IdeaFilterBar } from "@/components/filters/idea-filter";
import { IdeaResults } from "@/components/idea-results";
import type { Idea } from "@/data";

const themes = Array.from(new Set(ideas.map((idea) => idea.theme))) as Idea["theme"][];

export default function IdeasPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <p className="text-sm text-ink-2">阅读在地经验</p>
        <h1 className="font-serif-cn text-3xl text-ink sm:text-4xl">旅行灵感</h1>
        <p className="mt-2 max-w-3xl text-sm text-ink-2">这些文章来自创作者与旅人共同写下的现场笔记，远离空洞宣传语。</p>
      </div>
      <Suspense fallback={<p className="text-sm text-ink-2">正在载入筛选控件...</p>}>
        <IdeaFilterBar themes={themes} />
      </Suspense>
      <Suspense fallback={<p className="text-sm text-ink-2">正在载入文章...</p>}>
        <IdeaResults />
      </Suspense>
    </div>
  );
}
