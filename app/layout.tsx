import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ModalProvider } from "@/components/modal-context";
import { OrderModal } from "@/components/order-modal";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "野哉",
  description: "真实在场的在地旅行实验，连结创作者与旅人"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans-cn">
        <TooltipProvider delayDuration={300}>
          <ModalProvider>
          <a href="#main-content" className="skip-link">
            跳过主内容
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <OrderModal />
        </ModalProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
