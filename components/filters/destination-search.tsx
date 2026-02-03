"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Route } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const DestinationSearch = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState(params.get("q") ?? "");

  useEffect(() => {
    setValue(params.get("q") ?? "");
  }, [params]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = value.trim();
    const href = query
      ? (`/destinations?q=${encodeURIComponent(query)}` as Route)
      : ("/destinations" as Route);
    router.push(href);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <Input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="搜索目的地或关键词"
        className="flex-1 px-4 py-3 h-auto text-sm"
      />
      <Button type="submit" variant="outline" size="lg">
        搜索
      </Button>
    </form>
  );
};
