"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
    const search = query ? `?q=${encodeURIComponent(query)}` : "";
    router.push(`/destinations${search}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="搜索目的地或关键词"
        className="flex-1 rounded-card border border-line bg-surface px-4 py-3 text-sm"
      />
      <button type="submit" className="btn-outline">
        搜索
      </button>
    </form>
  );
};
