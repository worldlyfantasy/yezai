import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { destinations, services } from "@/data";
import { getDestinationBySlug } from "@/data/helpers";
import type { ServiceType, TravelStyle } from "@/data";
import { ServiceFilterBar } from "@/components/filters/service-filter";
import { DestinationServiceResults } from "@/components/destination-service-results";

const serviceTypes = Array.from(new Set(services.map((service) => service.type))) as ServiceType[];
const travelStyles = Array.from(new Set(services.flatMap((service) => service.styles))) as TravelStyle[];

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export default function DestinationDetail({ params }: { params: { slug: string } }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <Link href="/destinations" className="text-sm text-ink-2">
        ← 返回目的地
      </Link>
      <div className="mt-6 overflow-hidden rounded-card border border-line/60 bg-surface shadow-card">
        <Image
        src={destination.cover}
        alt={destination.name}
        width={1200}
        height={600}
        sizes="(max-width: 768px) 100vw, 1200px"
        className="h-56 w-full object-cover object-center md:h-80"
      />
        <div className="p-6">
          <p className="text-sm text-ink-2">目的地</p>
          <h1 className="font-serif-cn text-3xl text-ink sm:text-4xl">{destination.name}</h1>
          <p className="mt-2 text-base leading-relaxed text-ink-2">{destination.description}</p>
        </div>
      </div>

      <Suspense fallback={<p className="text-sm text-ink-2">正在载入筛选控件...</p>}>
        <ServiceFilterBar destinationSlug={destination.slug} types={serviceTypes} styles={travelStyles} />
      </Suspense>

      <Suspense fallback={<p className="text-sm text-ink-2">正在载入服务列表...</p>}>
        <DestinationServiceResults destinationSlug={destination.slug} />
      </Suspense>

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
