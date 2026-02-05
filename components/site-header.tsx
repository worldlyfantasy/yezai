"use client";

import { useState, useEffect } from "react";
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
  item,
  isActive,
  className,
  onLinkClick,
  onItemClick,
}: {
  item: NavItem;
  isActive: boolean;
  className?: string;
  onLinkClick?: () => void;
  onItemClick?: () => void;
}) {
  const key = typeof item.href === "string" ? item.href : `${item.href.pathname}#${item.href.hash}`;
  const handleClick = () => {
    onItemClick?.();
    onLinkClick?.();
  };
  return (
    <Link
      key={key}
      href={item.href}
      onClick={handleClick}
      className={cn(
        "block rounded-sm py-2 transition-colors duration-150 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isActive && "font-medium text-[rgb(153,57,33)]",
        !isActive && "text-ink-2",
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
  const [hash, setHash] = useState("");

  useEffect(() => {
    const readHash = () => setHash(typeof window !== "undefined" ? window.location.hash.slice(1) : "");
    readHash();
    const onHashChange = () => setHash(window.location.hash.slice(1));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [pathname]);

  const isBecomeActive = pathname === "/" && hash === "become";

  return (
    <header className="sticky top-0 z-40 bg-bg/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2" aria-label="野哉 首页">
          <LogoMark size="xl" />
        </Link>
        <nav aria-label="主导航" className="hidden gap-5 text-sm md:flex">
          {navItems.map((item) => {
            const matchPath = item.matchPath ?? (typeof item.href === "string" ? item.href : item.href.pathname);
            const isHashItem = typeof item.href !== "string" && item.href.pathname === "/" && item.href.hash === "become";
            const isActive = isHashItem ? isBecomeActive : pathname.startsWith(matchPath);
            const onItemClick = isHashItem ? () => setHash("become") : undefined;
            return (
              <NavLinks key={typeof item.href === "string" ? item.href : `${item.href.pathname}#${item.href.hash}`} item={item} isActive={isActive} className="py-0" onItemClick={onItemClick} />
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
                  const isHashItem = typeof item.href !== "string" && item.href.pathname === "/" && item.href.hash === "become";
                  const isActive = isHashItem ? isBecomeActive : pathname.startsWith(matchPath);
                  const onItemClick = isHashItem ? () => setHash("become") : undefined;
                  return (
                    <NavLinks
                      key={typeof item.href === "string" ? item.href : `${item.href.pathname}#${item.href.hash}`}
                      item={item}
                      isActive={isActive}
                      onLinkClick={() => setSheetOpen(false)}
                      onItemClick={onItemClick}
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
