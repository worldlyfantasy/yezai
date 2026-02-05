import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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
          <h1 className="font-serif-cn text-4xl tracking-tight text-ink drop-shadow-[0_1px_2px_rgba(253,248,240,0.8)] sm:text-5xl">
            如此之野，何其快哉！<br /><br />
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
          独立的旅行创作者栖息地<br />
          看见那些沉淀着在地经验、有温度的路线<br />
          为每一位奔赴山海的旅行者，照亮一条通往真实旅途的路径<br />
          野于本心，在彼途中<br /><br />
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
