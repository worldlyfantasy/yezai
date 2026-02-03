"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import type { Destination, TravelStyle } from "@/data";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  destinations: Destination[];
  styles: TravelStyle[];
}

export const CreatorFilterBar = ({ destinations, styles }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentDest = searchParams.get("destination") ?? "";
  const currentStyle = searchParams.get("style") ?? "";

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const queryString = params.toString();
    const href = `/creators${queryString ? `?${queryString}` : ""}`;
    router.push(href as Route);
  };

  return (
    <Card className="mb-6 flex flex-col gap-4 border-line/60 p-4 shadow-card md:flex-row md:items-end">
      <CardContent className="flex flex-col gap-2 p-0">
        <Label>目的地</Label>
        <Select value={currentDest || "all"} onValueChange={(v) => updateParam("destination", v === "all" ? "" : v)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            {destinations.map((dest) => (
              <SelectItem key={dest.slug} value={dest.slug}>
                {dest.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardContent className="flex flex-col gap-2 p-0">
        <Label>旅行风格</Label>
        <Select value={currentStyle || "all"} onValueChange={(v) => updateParam("style", v === "all" ? "" : v)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            {styles.map((style) => (
              <SelectItem key={style} value={style}>
                {style}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};
