import Link from "next/link";
import { creators, destinations, ideas } from "@/data";
import { CreatorCard } from "@/components/creator-card";
import { DestinationCard } from "@/components/destination-card";
import { IdeaCard } from "@/components/idea-card";
import { HomeHero } from "@/components/home-hero";
import { OrderButton } from "@/components/order-button";
import { StampMark } from "@/components/stamp-mark";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const steps = [
  { title: "发现创作者", detail: "浏览创作者档案，了解他们的田野背景、擅长地形与合作方式。" },
  { title: "选择服务", detail: "在服务详情页阅读交付范围与适合人群，决定是否加入小团或定制规划。" },
  { title: "托管支付", detail: "小程序托管费用并设置节点分账，确保创作者与旅人都在信任里行动。" },
  { title: "履约与回声", detail: "旅程结束后共同整理资料与反馈，形成下一次更新的基础。" }
];

export default function HomePage() {
  const featuredCreators = creators.slice(0, 3);
  const featuredDestinations = destinations.slice(0, 4);
  const featuredIdeas = ideas.slice(0, 3).map((idea) => ({
    idea,
    author: creators.find((c) => c.id === idea.authorId)
  }));

  return (
    <div>
      <HomeHero />
      <section className="mx-auto max-w-6xl px-4 py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 [animation-fill-mode:both] [animation-delay:100ms]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-2">真实创作者网络</p>
            <h2 className="font-serif-cn text-2xl text-ink sm:text-3xl">精选创作者</h2>
          </div>
          <Link href="/creators" className="rounded-sm text-sm text-brand transition-colors duration-150 hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            查看全部 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredCreators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 [animation-fill-mode:both] [animation-delay:200ms]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-2">在地风景</p>
            <h2 className="font-serif-cn text-2xl text-ink sm:text-3xl">精选目的地</h2>
          </div>
          <Link href="/destinations" className="rounded-sm text-sm text-brand transition-colors duration-150 hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            浏览目的地 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featuredDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 [animation-fill-mode:both] [animation-delay:300ms]">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-2">灵感与长文</p>
            <h2 className="font-serif-cn text-2xl text-ink sm:text-3xl">旅行灵感</h2>
          </div>
          <Link href="/ideas" className="rounded-sm text-sm text-brand transition-colors duration-150 hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            阅读更多 →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredIdeas.map(({ idea, author }) => (
            <IdeaCard key={idea.id} idea={idea} author={author} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 [animation-fill-mode:both] [animation-delay:400ms]">
        <Card className="relative overflow-hidden border-line/50 px-6 py-10 shadow-card texture-overlay">
          <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">托管机制</p>
              <h2 className="font-serif-cn text-2xl text-foreground sm:text-3xl">如何运作</h2>
            </div>
            <OrderButton variant="primary" />
          </div>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <div key={step.title} className="space-y-2 border-l border-border pl-4">
                <h3 className="font-serif-cn text-lg text-foreground sm:text-xl">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <Separator />
      </div>

      <section id="become" className="mx-auto max-w-6xl px-4 py-16 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 [animation-fill-mode:both] [animation-delay:500ms]">
        <div className="rounded-card border border-dashed border-brand/40 bg-wash/40 p-8 text-center text-ink">
          <div className="mb-4 flex items-center justify-center gap-3 text-brand">
            <StampMark />
            <span className="font-serif-cn text-2xl sm:text-3xl">成为创作者</span>
          </div>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-ink-2">
            野哉欢迎常驻在地、坚持真实表达的创作者加入。我们会与您共同设计服务结构、保障费用托管，并为旅人提供充分信息。留下您的意向，我们会安排面谈。
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <OrderButton variant="primary">提交意向（去小程序）</OrderButton>
            <Button asChild variant="outline" size="lg">
              <Link href="/how-it-works">了解审核流程</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
