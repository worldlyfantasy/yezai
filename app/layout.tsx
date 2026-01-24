import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ModalProvider } from "@/components/modal-context";
import { OrderModal } from "@/components/order-modal";

export const metadata: Metadata = {
  title: "野哉",
  description: "真实在场的在地旅行实验，连结创作者与旅人"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <ModalProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <OrderModal />
        </ModalProvider>
      </body>
    </html>
  );
}
