"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Idea } from "@/data";
import { creators } from "@/data";
import { filterIdeasByTheme } from "@/data/helpers";
import { IdeaCard } from "@/components/idea-card";

export const IdeaResults = () => {
  const searchParams = useSearchParams();
  const themeParam = searchParams.get("theme") as Idea["theme"] | null;
  const filtered = filterIdeasByTheme(themeParam ?? undefined);
  const itemRefs = useRef(new Map<string, HTMLDivElement>());
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [columnCount, setColumnCount] = useState(1);
  const [columns, setColumns] = useState<Idea[][]>([]);

  const setItemRef = useCallback(
    (id: string) => (node: HTMLDivElement | null) => {
      if (node) {
        itemRefs.current.set(id, node);
      } else {
        itemRefs.current.delete(id);
      }
    },
    []
  );

  useEffect(() => {
    const updateColumns = () => {
      const width = containerRef.current?.clientWidth ?? 0;
      if (width >= 1024) {
        setColumnCount(3);
      } else if (width >= 640) {
        setColumnCount(2);
      } else {
        setColumnCount(1);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useLayoutEffect(() => {
    if (!filtered.length) {
      if (columns.length) setColumns([]);
      return;
    }

    const gap = 24;
    const nextHeights = Array.from({ length: columnCount }, () => 0);
    const nextColumns: Idea[][] = Array.from({ length: columnCount }, () => []);

    filtered.forEach((idea) => {
      const height = itemRefs.current.get(idea.id)?.getBoundingClientRect().height ?? 0;
      const shortest = nextHeights.indexOf(Math.min(...nextHeights));
      nextColumns[shortest].push(idea);
      nextHeights[shortest] += height + gap;
    });

    const currentIds = columns.flatMap((col) => col.map((item) => item.id)).join(",");
    const nextIds = nextColumns.flatMap((col) => col.map((item) => item.id)).join(",");
    if (currentIds !== nextIds) {
      setColumns(nextColumns);
    }
  }, [filtered, columnCount, columns]);

  return (
    <>
      <div ref={containerRef} className="masonry-balanced">
        {(columns.length ? columns : [filtered]).map((column, columnIndex) => (
          <div key={`col-${columnIndex}`} className="masonry-column">
            {column.map((idea) => (
              <div key={idea.id} ref={setItemRef(idea.id)}>
                <IdeaCard idea={idea} author={creators.find((c) => c.id === idea.authorId)} />
              </div>
            ))}
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无相关文章。</p>}
    </>
  );
};
