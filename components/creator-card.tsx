import Link from "next/link";
import Image from "next/image";
import type { Creator } from "@/data";

export const CreatorCard = ({ creator }: { creator: Creator }) => {
  return (
    <Link
      href={`/creators/${creator.slug}`}
      className="paper-card flex flex-col gap-4 border border-line/60 bg-surface p-5 transition hover:-translate-y-1"
    >
      <div className="flex items-center gap-3">
        <Image src={creator.avatar} alt={creator.name} width={72} height={72} className="h-16 w-16 rounded-full border border-line object-cover" />
        <div>
          <p className="font-serif-cn text-2xl tracking-tight text-ink">{creator.name}</p>
          <p className="text-sm text-ink-2">{creator.stance}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 text-xs text-ink-2">
        {creator.tags.map((tag) => (
          <span key={tag} className="chip-filter bg-surface-2/60 text-ink text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="text-sm text-ink-2">
        擅长地区：{creator.destinationSlugs.length} 个 · 服务 {creator.serviceIds.length} 项
      </div>
    </Link>
  );
};
