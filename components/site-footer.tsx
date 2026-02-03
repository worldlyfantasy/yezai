import { StampMark } from "./stamp-mark";
import { Separator } from "@/components/ui/separator";

export const SiteFooter = () => {
  return (
    <footer className="mt-16 border-t border-line/60 bg-surface-2/40 shadow-[0_-1px_0_0_var(--line)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 text-brand">
            <StampMark />
            <span className="font-serif-cn text-xl tracking-tight">野哉</span>
          </div>
          <p className="mt-3 max-w-md text-sm text-ink-2">
            我们坚持小而真实的旅程，与创作者、村落与自然共建信任。网页演示仅用于展示理念与功能，正式下单请前往小程序。
          </p>
        </div>
        <Separator orientation="vertical" className="hidden h-14 md:block" />
        <div className="shrink-0 text-sm text-ink-2">
          <p>联系团队：hi@yezai.local</p>
          <p className="mt-1">© {new Date().getFullYear()} 野哉 · 保留对内容的使用权</p>
        </div>
      </div>
    </footer>
  );
};
