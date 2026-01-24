import Link from "next/link";
import { notFound } from "next/navigation";
import { services, creators, destinations } from "@/data";
import { getServiceBySlug } from "@/data/helpers";
import { OrderButton } from "@/components/order-button";

export default function ServiceDetail({ params }: { params: { slug: string } }) {
  const service = getServiceBySlug(params.slug);
  if (!service) return notFound();

  const creator = creators.find((c) => c.id === service.creatorId);
  const relatedDestinations = destinations.filter((dest) => service.destinationSlugs.includes(dest.slug));

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <Link href={`/destinations/${service.destinationSlugs[0]}`} className="text-sm text-ink-2">
        ← 返回目的地
      </Link>
      <div className="mt-6 rounded-card border border-line/60 bg-surface p-6 shadow-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-ink-2">{service.type}</p>
            <h1 className="font-serif-cn text-4xl text-ink">{service.name}</h1>
            <p className="mt-2 text-base text-ink-2">{service.summary}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-ink">{service.price}</p>
            <p className="text-xs text-ink-2">节奏：{service.durationTag}</p>
            <div className="mt-4">
              <OrderButton>下单并支付</OrderButton>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line/60 bg-surface p-5 shadow-card">
          <h2 className="font-serif-cn text-2xl text-ink">适合谁</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {service.suitable.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-line/60 bg-surface p-5 shadow-card">
          <h2 className="font-serif-cn text-2xl text-ink">不适合谁</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {service.notSuitable.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-line/60 bg-surface p-5 shadow-card">
          <h2 className="font-serif-cn text-2xl text-ink">交付物</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {service.deliverables.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-line/60 bg-surface p-5 shadow-card">
          <h2 className="font-serif-cn text-2xl text-ink">不包含</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-2">
            {service.exclusions.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-card border border-line/60 bg-surface p-4 shadow-card text-sm text-ink-2">
          <p className="font-serif-cn text-xl text-ink">交付周期</p>
          <p className="mt-2">{service.timeline}</p>
        </div>
        <div className="rounded-card border border-line/60 bg-surface p-4 shadow-card text-sm text-ink-2">
          <p className="font-serif-cn text-xl text-ink">修改规则</p>
          <p className="mt-2">{service.revision}</p>
        </div>
        <div className="rounded-card border border-line/60 bg-surface p-4 shadow-card text-sm text-ink-2">
          <p className="font-serif-cn text-xl text-ink">托管提醒</p>
          <p className="mt-2">付款在小程序托管，节点验收后才会分账。</p>
        </div>
      </section>

      <section className="mt-10 rounded-card border border-line/60 bg-surface p-5 shadow-card">
        <details className="text-sm text-ink-2" open>
          <summary className="cursor-pointer font-serif-cn text-2xl text-ink">退款规则</summary>
          <p className="mt-3 leading-relaxed">{service.refund}</p>
        </details>
      </section>

      {creator && (
        <section className="mt-10 rounded-card border border-line/60 bg-surface-2/60 p-6">
          <h2 className="font-serif-cn text-3xl text-ink">创作者</h2>
          <p className="mt-2 text-base text-ink-2">{creator.name}</p>
          <p className="mt-1 text-sm text-ink-2">{creator.stance}</p>
          <Link href={`/creators/${creator.slug}`} className="mt-3 inline-flex text-sm text-brand">
            查看创作者详情 →
          </Link>
        </section>
      )}

      <section className="mt-10 rounded-card border border-line/60 bg-surface p-6">
        <h2 className="font-serif-cn text-2xl text-ink">涉及目的地</h2>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-ink-2">
          {relatedDestinations.map((dest) => (
            <Link key={dest.id} href={`/destinations/${dest.slug}`} className="chip-filter">
              {dest.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
