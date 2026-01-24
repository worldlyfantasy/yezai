import Link from "next/link";
import Image from "next/image";
import type { Idea, Creator } from "@/data";

export const IdeaCard = ({ idea, author }: { idea: Idea; author?: Creator }) => (
  <Link href={`/ideas/${idea.slug}`} className="flex flex-col overflow-hidden rounded-card border border-line/60 bg-surface shadow-card">
    <Image src={idea.cover} alt={idea.title} width={640} height={360} className="h-48 w-full object-cover" />
    <div className="flex flex-1 flex-col gap-2 p-5">
      <div className="text-xs text-ink-2">{idea.theme}</div>
      <h3 className="font-serif-cn text-2xl text-ink">{idea.title}</h3>
      <p className="text-sm text-ink-2 leading-relaxed">{idea.summary}</p>
      {author && <p className="text-xs text-ink-2">作者：{author.name}</p>}
    </div>
  </Link>
);
