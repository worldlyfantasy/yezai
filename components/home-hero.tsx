import Link from "next/link";
import Image from "next/image";
import { LogoMark } from "./logo-mark";

export const HomeHero = () => {
  return (
    <section className="relative overflow-hidden bg-wash/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-16 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-chip border border-line bg-surface-2/60 px-4 py-1 text-sm text-ink-2">
            <LogoMark size="sm" />
            真实在场 · 与在地创作者同行
          </p>
          <h1 className="font-serif-cn text-4xl tracking-tight text-ink sm:text-5xl">
            野哉，留给慢速旅程与诚实表达的公共院子
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-ink-2">
            我们与分布在高原、雨林与盐田的创作者共同策划小型旅程。这里没有批量复制的套餐，只有依据土地、人物与季节调整的体验。所有行程通过托管机制保障透明。 
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/creators" className="btn-primary">
              认识创作者
            </Link>
            <Link href="/how-it-works" className="btn-outline">
              了解如何运作
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative rounded-card border border-line bg-surface shadow-float">
            <Image
              src="/generated/dest-01.png"
              alt="大地色风景"
              width={800}
              height={520}
              className="h-full w-full rounded-card object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-card bg-surface/90 p-4 text-sm text-ink-2 shadow-card">
              “真实在场”意味着行程随当地呼吸而动，我们只负责守护边界与信任。
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
