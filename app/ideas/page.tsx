import { ideas, creators } from "@/data";
import { filterIdeasByTheme } from "@/data/helpers";
import { IdeaCard } from "@/components/idea-card";
import { IdeaFilterBar } from "@/components/filters/idea-filter";
import type { Idea } from "@/data";

const themes = Array.from(new Set(ideas.map((idea) => idea.theme))) as Idea["theme"][];

export default function IdeasPage({ searchParams }: { searchParams: { theme?: Idea["theme"] } }) {
  const filtered = filterIdeasByTheme(searchParams.theme);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-6">
        <p className="text-sm text-ink-2">阅读在地经验</p>
        <h1 className="font-serif-cn text-4xl text-ink">旅行灵感</h1>
        <p className="mt-2 max-w-3xl text-sm text-ink-2">这些文章来自创作者与旅人共同写下的现场笔记，远离空洞宣传语。</p>
      </div>
      <IdeaFilterBar themes={themes} />
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} author={creators.find((c) => c.id === idea.authorId)} />
        ))}
      </div>
    </div>
  );
}
