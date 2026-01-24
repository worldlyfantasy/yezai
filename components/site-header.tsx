"use client";

import Link from "next/link";
import type { Route } from "next";
import { LogoMark } from "./logo-mark";
import { useOrderModal } from "./modal-context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: Route | { pathname: Route; hash: string };
  matchPath?: Route;
};

const navItems: NavItem[] = [
  { label: "发现创作者", href: "/creators" },
  { label: "目的地", href: "/destinations" },
  { label: "旅行灵感", href: "/ideas" },
  { label: "如何运作", href: "/how-it-works" },
  { label: "成为创作者", href: { pathname: "/", hash: "become" }, matchPath: "/" }
];

export const SiteHeader = () => {
  const { open } = useOrderModal();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <LogoMark size="sm" />
          <span className="font-serif-cn text-2xl tracking-tight text-ink">野哉</span>
        </Link>
        <nav className="hidden gap-5 text-sm text-ink-2 md:flex">
          {navItems.map((item) => {
            const key = typeof item.href === "string" ? item.href : `${item.href.pathname}#${item.href.hash}`;
            const matchPath = item.matchPath ?? (typeof item.href === "string" ? item.href : item.href.pathname);
            return (
              <Link
                key={key}
                href={item.href}
                className={cn(
                  "transition hover:text-ink",
                  pathname.startsWith(matchPath) && "text-ink font-medium"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button onClick={open} className="btn-primary text-sm">
          去小程序下单
        </button>
      </div>
    </header>
  );
};
