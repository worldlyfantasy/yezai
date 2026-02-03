import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { creators, destinations, services } from "@/data";
import { getCreatorBySlug } from "@/data/helpers";
import { OrderButton } from "@/components/order-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function generateStaticParams() {
  return creators.map((creator) => ({ slug: creator.slug }));
}

export default function CreatorDetail({ params }: { params: { slug: string } }) {
  const creator = getCreatorBySlug(params.slug);
  if (!creator) return notFound();

  const creatorDestinations = destinations.filter((dest) => creator.destinationSlugs.includes(dest.slug));
  const relatedServices = services.filter((service) => creator.serviceIds.includes(service.id));
  const groupServices = relatedServices.filter((service) => creator.groupIds.includes(service.id));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href="/creators" className="text-sm text-ink-2">
        ← 返回创作者列表
      </Link>
      <div className="mt-6 rounded-card border border-line/70 bg-surface p-6 shadow-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <Image src={creator.avatar} alt={creator.name} width={160} height={160} className="h-40 w-40 rounded-full border border-line object-cover" />
          <div className="flex-1">
            <p className="text-sm text-ink-2">创作者</p>
            <h1 className="font-serif-cn text-4xl text-ink">{creator.name}</h1>
            <p className="mt-2 text-base text-ink-2">{creator.stance}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {creator.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink-2">
              <span>服务 {creator.serviceIds.length} 项</span>
              <span>常驻目的地 {creatorDestinations.length} 个</span>
            </div>
          </div>
          <OrderButton>去小程序下单</OrderButton>
        </div>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line/60 bg-surface p-5 shadow-card">
          <h2 className="font-serif-cn text-2xl text-ink">关于我</h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-2">
            {creator.about.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
        <div className="rounded-card border border-line/60 bg-surface p-5 shadow-card">
          <h2 className="font-serif-cn text-2xl text-ink">适合谁 / 不适合谁</h2>
          <div className="mt-4 grid gap-4 text-sm text-ink-2 md:grid-cols-2">
            <div>
              <p className="font-medium text-ink">适合</p>
              <ul className="mt-2 space-y-1">
                {creator.suitable.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium text-ink">不适合</p>
              <ul className="mt-2 space-y-1">
                {creator.notSuitable.map((item) => (
                  <li key={item}>· {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-serif-cn text-3xl text-ink">主要服务</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {relatedServices.map((service) => (
            <div key={service.id} className="rounded-card border border-line/60 bg-surface p-5 shadow-card">
              <div className="flex items-center justify-between text-xs text-ink-2">
                <span className="rounded-chip bg-wash px-3 py-1 text-brand">{service.type}</span>
                <span>{service.durationTag}</span>
              </div>
              <h3 className="mt-3 font-serif-cn text-2xl text-ink">{service.name}</h3>
              <p className="mt-2 text-sm text-ink-2 leading-relaxed">{service.summary}</p>
              <p className="mt-3 text-sm text-ink">{service.price}</p>
              <Link href={`/services/${service.slug}`} className="mt-3 inline-flex text-sm text-brand">
                查看详情 →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {groupServices.length > 0 && (
        <section className="mt-10">
          <h2 className="font-serif-cn text-3xl text-ink">招募小团</h2>
          <div className="mt-4 space-y-3 text-sm text-ink-2">
            {groupServices.map((service) => (
              <div key={service.id} className="rounded-card border border-dashed border-brand/50 bg-wash/40 p-4">
                <p className="font-serif-cn text-xl text-brand">{service.name}</p>
                <p className="text-sm">节奏：{service.durationTag} · 费用：{service.price}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="font-serif-cn text-3xl text-ink">旅人评价</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {creator.reviews.map((review, index) => (
            <div key={index} className="rounded-card border border-line/50 bg-surface-2/60 p-4">
              <p className="text-sm leading-relaxed text-ink">{review.content}</p>
              <p className="mt-2 text-xs text-ink-2">— {review.audience}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-card border border-line/60 bg-surface p-6 shadow-card">
        <h2 className="font-serif-cn text-3xl text-ink">相关目的地</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm text-ink-2">
          {creatorDestinations.map((dest) => (
            <Button key={dest.id} asChild variant="outline" size="sm" className="rounded-chip">
              <Link href={`/destinations/${dest.slug}`}>{dest.name}</Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
