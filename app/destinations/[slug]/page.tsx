import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { creators, services } from "@/data";
import { getDestinationBySlug } from "@/data/helpers";
import type { ServiceType, TravelStyle } from "@/data";
import { ServiceCard } from "@/components/service-card";
import { ServiceFilterBar } from "@/components/filters/service-filter";

const serviceTypes = Array.from(new Set(services.map((service) => service.type))) as ServiceType[];
const travelStyles = Array.from(new Set(services.flatMap((service) => service.styles))) as TravelStyle[];

export default function DestinationDetail({
  params,
  searchParams
}: {
  params: { slug: string };
  searchParams: { type?: ServiceType; style?: TravelStyle };
}) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return notFound();

  const filteredServices = services.filter((service) => {
    if (!service.destinationSlugs.includes(destination.slug)) return false;
    if (searchParams.type && service.type !== searchParams.type) return false;
    if (searchParams.style && !service.styles.includes(searchParams.style)) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link href="/destinations" className="text-sm text-ink-2">
        ← 返回目的地
      </Link>
      <div className="mt-6 overflow-hidden rounded-card border border-line/60 bg-surface shadow-card">
        <Image src={destination.cover} alt={destination.name} width={1200} height={600} className="h-80 w-full object-cover" />
        <div className="p-6">
          <p className="text-sm text-ink-2">目的地</p>
          <h1 className="font-serif-cn text-4xl text-ink">{destination.name}</h1>
          <p className="mt-2 text-base leading-relaxed text-ink-2">{destination.description}</p>
        </div>
      </div>

      <ServiceFilterBar destinationSlug={destination.slug} types={serviceTypes} styles={travelStyles} />

      <div className="grid gap-6 md:grid-cols-2">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} creator={creators.find((c) => c.id === service.creatorId)} />
        ))}
      </div>
      {filteredServices.length === 0 && <p className="mt-8 text-sm text-ink-2">暂无符合筛选的服务。</p>}

      <div className="mt-10 rounded-card border border-line/60 bg-surface-2/60 p-6">
        <h2 className="font-serif-cn text-2xl text-ink">寻找适合的创作者</h2>
        <p className="mt-2 text-sm text-ink-2">查看与 {destination.name} 有长期合作的创作者，了解他们的工作方法与边界。</p>
        <Link
          href={{
            pathname: "/creators",
            query: { destination: destination.slug }
          }}
          className="mt-4 inline-flex rounded-btn border border-brand px-5 py-2 text-sm text-brand"
        >
          跳转至创作者页面
        </Link>
      </div>
    </div>
  );
}
