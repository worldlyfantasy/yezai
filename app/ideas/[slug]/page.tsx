import Link from "next/link";
import { notFound } from "next/navigation";
import { ideas, creators } from "@/data";
import { getIdeaBySlug } from "@/data/helpers";
import { OrderButton } from "@/components/order-button";

const renderBlocks = (body: string) => {
  return body.split("\n\n").map((block, index) => {
    if (block.startsWith("###")) {
      return (
        <h2 key={index} className="text-ink">
          {block.replace("###", "").trim()}
        </h2>
      );
    }
    if (block.startsWith(">")) {
      return (
        <blockquote key={index}>
          {block.replace(">", "").trim()}
        </blockquote>
      );
    }
    return <p key={index}>{block}</p>;
  });
};

export default function IdeaDetail({ params }: { params: { slug: string } }) {
  const idea = getIdeaBySlug(params.slug);
  if (!idea) return notFound();
  const author = creators.find((c) => c.id === idea.authorId);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Link href="/ideas" className="text-sm text-ink-2">
        ← 返回文章列表
      </Link>
      <article className="article-content mx-auto mt-6 rounded-card border border-line/60 bg-surface p-8 shadow-card">
        <p className="text-sm text-ink-2">主题：{idea.theme}</p>
        <h1 className="font-serif-cn text-4xl text-ink">{idea.title}</h1>
        <p className="mt-2 text-base text-ink-2">{idea.summary}</p>
        <div className="mt-8 space-y-4">{renderBlocks(idea.body)}</div>
        <div className="mt-10 rounded-card border border-line/60 bg-surface-2/60 p-5">
          <p className="text-sm text-ink-2">文末引导</p>
          <p className="text-base text-ink">{idea.cta}</p>
        </div>
      </article>
      {author && (
        <div className="mx-auto mt-8 flex flex-col gap-4 rounded-card border border-line/60 bg-surface p-6 shadow-card sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-ink-2">作者</p>
            <h3 className="font-serif-cn text-2xl text-ink">{author.name}</h3>
            <p className="text-sm text-ink-2">{author.stance}</p>
          </div>
          <div className="flex flex-1 flex-wrap gap-3 sm:justify-end">
            <Link href={`/creators/${author.slug}`} className="btn-outline">
              查看创作者
            </Link>
            <OrderButton>联系并下单</OrderButton>
          </div>
        </div>
      )}
    </div>
  );
}
