import Link from "next/link";
import type { Service, Creator } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const ServiceCard = ({ service, creator }: { service: Service; creator?: Creator }) => (
  <Link href={`/services/${service.slug}`} className="group block rounded-card transition-all duration-200 ease-out hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
    <Card className="flex flex-col gap-3 border-line/70 p-5 shadow-card transition-shadow duration-200 group-hover:shadow-float">
      <CardContent className="flex items-center justify-between p-0 text-xs text-muted-foreground">
        <Badge variant="default">{service.type}</Badge>
        <span>{service.durationTag}</span>
      </CardContent>
      <h3 className="font-serif-cn text-2xl text-foreground">{service.name}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{service.summary}</p>
      {creator && <p className="text-sm text-foreground">由 {creator.name}</p>}
      <div className="flex items-center justify-between text-sm text-foreground">
        <span>{service.price}</span>
        <span className="text-muted-foreground">查看详情 →</span>
      </div>
    </Card>
  </Link>
);
