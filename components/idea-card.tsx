import Link from "next/link";
import Image from "next/image";
import type { Idea, Creator } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const IdeaCard = ({ idea, author }: { idea: Idea; author?: Creator }) => (
  <Link href={`/ideas/${idea.slug}`} className="group block w-full break-inside-avoid rounded-card transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
    <Card className="paper-card flex flex-1 flex-col overflow-hidden border-line/60 shadow-card transition-shadow duration-200 group-hover:shadow-float">
      <Image
      src={idea.cover}
      alt={idea.title}
      width={640}
      height={360}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="h-44 w-full object-cover object-center md:h-56"
    />
      <CardContent className="flex flex-1 flex-col gap-3 p-6">
        <Badge variant="secondary" className="w-fit text-xs text-muted-foreground">{idea.theme}</Badge>
        <h3 className="font-serif-cn text-2xl text-foreground">{idea.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{idea.summary}</p>
        {author && <p className="mt-auto text-xs text-muted-foreground">作者：{author.name}</p>}
      </CardContent>
    </Card>
  </Link>
);
