import Link from "next/link";
import Image from "next/image";
import { LogoMark } from "./logo-mark";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const HomeHero = () => {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-bg animate-in fade-in-0 slide-in-from-bottom-4 duration-500 [animation-fill-mode:both]">
      {/* 背景图：弱化纹理，不抢文字 */}
      <div className="hero-bg-layer absolute inset-0" aria-hidden />
      {/* 遮罩：与页面背景同色，保证对比度 */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{ background: "var(--hero-overlay)" }}
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-1 text-sm font-normal">
            <LogoMark size="sm" />
            真实在场 · 与在地创作者同行
          </Badge>
          <h1 className="font-serif-cn text-4xl tracking-tight text-ink drop-shadow-[0_1px_2px_rgba(253,248,240,0.8)] sm:text-5xl">
            野哉，留给慢速旅程与诚实表达的公共院子
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
            我们与分布在高原、雨林与盐田的创作者共同策划小型旅程。这里没有批量复制的套餐，只有依据土地、人物与季节调整的体验。所有行程通过托管机制保障透明。 
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/creators">认识创作者</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/how-it-works">了解如何运作</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <Card className="relative overflow-hidden shadow-float">
            <Image
              src="landing.jpg"
              alt="大地色风景"
              width={800}
              height={520}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="h-full w-full rounded-card object-cover object-center"
            />
          </Card>
        </div>
      </div>
    </section>
  );
};
