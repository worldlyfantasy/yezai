"use client";

import { useSearchParams } from "next/navigation";
import type { Idea } from "@/data";
import { creators } from "@/data";
import { filterIdeasByTheme } from "@/data/helpers";
import { IdeaCard } from "@/components/idea-card";

export const IdeaResults = () => {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme") as Idea["theme"] | null;
  const filtered = filterIdeasByTheme(themeParam ?? undefined);

  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {filtered.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} author={creators.find((c) => c.id === idea.authorId)} />
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无相关文章。</p>}
    </>
  );
};
