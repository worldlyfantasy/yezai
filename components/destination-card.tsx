import Link from "next/link";
import Image from "next/image";
import type { Destination } from "@/data";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export const DestinationCard = ({ destination }: { destination: Destination }) => (
  <Link href={`/destinations/${destination.slug}`} className="group block rounded-card transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
    <Card className="flex flex-1 flex-col overflow-hidden border-line/50 shadow-card transition-shadow duration-200 group-hover:shadow-float">
      <Image
        src={destination.cover}
        alt={destination.name}
        width={640}
        height={400}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
        className="h-40 w-full object-cover object-center md:h-48"
      />
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-4 pb-0">
        <h3 className="font-serif-cn text-2xl text-foreground">{destination.name}</h3>
        <span className="text-xs text-muted-foreground">{destination.routeCount} 条路线 · {destination.creatorCount} 位创作者</span>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground leading-relaxed">{destination.description}</p>
      </CardContent>
    </Card>
  </Link>
);
