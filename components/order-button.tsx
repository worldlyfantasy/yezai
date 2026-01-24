"use client";

import { useOrderModal } from "./modal-context";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export const OrderButton = ({ variant = "primary", children = "去小程序下单", className = "" }: { variant?: "primary" | "outline"; children?: ReactNode; className?: string }) => {
  const { open } = useOrderModal();
  return (
    <button
      onClick={open}
      className={cn(variant === "primary" ? "btn-primary" : "btn-outline", className)}
      type="button"
    >
      {children}
    </button>
  );
};
