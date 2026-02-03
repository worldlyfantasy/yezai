"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import type { ServiceType, TravelStyle } from "@/data";
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
  destinationSlug: string;
  types: ServiceType[];
  styles: TravelStyle[];
}

export const ServiceFilterBar = ({ destinationSlug, types, styles }: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const currentType = params.get("type") ?? "";
  const currentStyle = params.get("style") ?? "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    const search = next.toString();
    const href = (search ? `/destinations/${destinationSlug}?${search}` : `/destinations/${destinationSlug}`) as Route;
    router.push(href);
  };

  return (
    <Card className="mb-8 flex flex-col gap-4 border-line/60 p-4 shadow-card md:flex-row md:items-end">
      <CardContent className="flex flex-1 flex-col gap-2 p-0">
        <Label>服务类型</Label>
        <Select value={currentType || "all"} onValueChange={(v) => update("type", v === "all" ? "" : v)}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="全部" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardContent className="flex flex-1 flex-col gap-2 p-0">
        <Label>旅行风格</Label>
        <Select value={currentStyle || "all"} onValueChange={(v) => update("style", v === "all" ? "" : v)}>
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
