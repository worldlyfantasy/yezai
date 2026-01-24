import { OrderButton } from "@/components/order-button";
import { StampMark } from "@/components/stamp-mark";

const flows = [
  {
    title: "发现",
    description: "浏览创作者与目的地，阅读他们的田野背景与边界说明。"
  },
  {
    title: "选择服务",
    description: "根据适合/不适合、交付物与价格判断是否加入现有小团或开启定制。"
  },
  {
    title: "托管支付",
    description: "所有款项在小程序托管，按里程碑分账。创作者与旅人都能实时查看进度。"
  },
  {
    title: "履约评价",
    description: "旅程结束后共同整理资料，生成公开或私密的反馈，为下一次合作打底。"
  }
];

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-card border border-line/60 bg-surface p-8 shadow-card">
        <div className="flex items-center gap-4 text-brand">
          <StampMark />
          <div>
            <p className="text-sm text-ink-2">信任机制</p>
            <h1 className="font-serif-cn text-4xl text-ink">如何运作</h1>
          </div>
        </div>
        <p className="mt-4 text-base text-ink-2">
          野哉以托管支付与分账机制保障双方。网页展示示例内容，具体合同、支付、文件签署均在小程序内完成。旅人可随时查看节点信息，创作者也能获得清晰的现金流计划。
        </p>
        <div className="mt-8 space-y-6">
          {flows.map((flow) => (
            <div key={flow.title} className="border-l-4 border-brand/60 pl-4">
              <h2 className="font-serif-cn text-2xl text-ink">{flow.title}</h2>
              <p className="text-sm text-ink-2">{flow.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-card border border-line/60 bg-wash/60 p-6 text-center">
          <p className="text-sm text-ink-2">准备好了？</p>
          <h3 className="font-serif-cn text-3xl text-ink">去小程序完成下单</h3>
          <p className="mt-2 text-sm text-ink-2">网页演示仅用于了解流程，支付请前往托管系统。</p>
          <OrderButton className="mt-4" />
        </div>
      </div>
    </div>
  );
}
