"use client";

import { useOrderModal } from "./modal-context";
import { LogoMark } from "./logo-mark";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export const OrderModal = () => {
  const { isOpen, close } = useOrderModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent showClose={true} className="max-w-lg">
        <DialogHeader>
          <div className="mb-6 flex items-center gap-3">
            <LogoMark size="md" />
            <span className="font-serif-cn text-2xl tracking-tight text-primary">野哉</span>
          </div>
          <DialogTitle className="mb-4">去小程序完成下单</DialogTitle>
          <DialogDescription className="mb-6 text-base leading-relaxed">
            网页仅提供浏览与了解，所有支付及合同将在小程序内托管完成。扫描下方二维码后，客服会在 24 小时内与您确认需求。
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex-1 rounded-card border border-dashed border-stone/60 bg-wash/40 p-6 text-center">
            <svg className="mx-auto h-32 w-32 text-stone" viewBox="0 0 160 160" aria-hidden>
              <rect width="160" height="160" rx="16" fill="none" stroke="currentColor" strokeDasharray="8 8" opacity="0.5" />
              <text x="80" y="84" textAnchor="middle" fill="currentColor" fontSize="12">此处放小程序码</text>
            </svg>
          </div>
          <div className="flex-1 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>· 浏览演示站后，可在小程序中查看完整服务条款与支付流程。</p>
            <p>· 我们采用托管支付与阶段性分账，保障创作者与旅人双方权益。</p>
            <p>· 如需人工协助，请在小程序留言“野哉”，团队会在当日回复。</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
