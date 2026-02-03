"use client";

import { useState } from "react";
import Link from "next/link";
import type { Route } from "next";
import { LogoMark } from "./logo-mark";
import { useOrderModal } from "./modal-context";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Menu } from "lucide-react";

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

function NavLinks({
  pathname,
  matchPath,
  item,
  className,
  onLinkClick,
}: {
  pathname: string;
  matchPath: string;
  item: NavItem;
  className?: string;
  onLinkClick?: () => void;
}) {
  const key = typeof item.href === "string" ? item.href : `${item.href.pathname}#${item.href.hash}`;
  return (
    <Link
      key={key}
      href={item.href}
      onClick={onLinkClick}
      className={cn(
        "block rounded-sm py-2 transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        pathname.startsWith(matchPath) && "text-ink font-medium",
        className
      )}
    >
      {item.label}
    </Link>
  );
}

export const SiteHeader = () => {
  const { open } = useOrderModal();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <LogoMark size="sm" />
          <span className="font-serif-cn text-2xl tracking-tight text-ink">野哉</span>
        </Link>
        <nav aria-label="主导航" className="hidden gap-5 text-sm text-ink-2 md:flex">
          {navItems.map((item) => {
            const matchPath = item.matchPath ?? (typeof item.href === "string" ? item.href : item.href.pathname);
            return (
              <NavLinks key={typeof item.href === "string" ? item.href : `${item.href.pathname}#${item.href.hash}`} pathname={pathname} matchPath={matchPath} item={item} className="py-0" />
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="打开菜单"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[min(20rem,85vw)]">
              <SheetHeader>
                <SheetTitle className="font-serif-cn text-xl">菜单</SheetTitle>
              </SheetHeader>
              <nav aria-label="主导航（移动端）" className="mt-6 flex flex-col gap-1 text-base text-ink-2">
                {navItems.map((item) => {
                  const matchPath = item.matchPath ?? (typeof item.href === "string" ? item.href : item.href.pathname);
                  return (
                    <NavLinks
                      key={typeof item.href === "string" ? item.href : `${item.href.pathname}#${item.href.hash}`}
                      pathname={pathname}
                      matchPath={matchPath}
                      item={item}
                      onLinkClick={() => setSheetOpen(false)}
                    />
                  );
                })}
              </nav>
              <div className="mt-6 border-t border-border pt-6">
                <Button onClick={() => { setSheetOpen(false); open(); }} variant="default" size="lg" className="w-full">
                  去小程序下单
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={open} variant="default" size="sm" className="hidden text-sm md:inline-flex">
                去小程序下单
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>网页仅展示，下单请至小程序</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </header>
  );
};
