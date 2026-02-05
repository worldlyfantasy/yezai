import Link from "next/link";
import Image from "next/image";
import type { Creator } from "@/data";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const CreatorCard = ({ creator }: { creator: Creator }) => {
  return (
    <Link href={`/creators/${creator.slug}`} className="group block rounded-card transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
      <Card className="paper-card flex flex-col gap-4 border-line/60 p-6 transition-shadow duration-200 group-hover:shadow-float">
        <CardHeader className="flex flex-row items-center gap-4 p-0">
          <Image src={creator.avatar} alt={creator.name} width={84} height={84} className="h-16 w-16 rounded-full border border-border object-cover sm:h-20 sm:w-20" />
          <div>
            <p className="font-serif-cn text-2xl tracking-tight text-foreground">{creator.name}</p>
            <p className="text-sm text-muted-foreground">{creator.stance}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 p-0 text-xs">
          {creator.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-foreground">
              {tag}
            </Badge>
          ))}
        </CardContent>
        <CardContent className="flex items-center justify-between border-t border-border/70 p-0 pt-4 text-xs text-muted-foreground">
          <span>擅长地区 {creator.destinationSlugs.length} 个</span>
          <span>服务 {creator.serviceIds.length} 项</span>
        </CardContent>
      </Card>
    </Link>
  );
};
