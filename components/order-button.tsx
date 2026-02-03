"use client";

import { useOrderModal } from "./modal-context";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export const OrderButton = ({ variant = "primary", children = "去小程序下单", className = "" }: { variant?: "primary" | "outline"; children?: ReactNode; className?: string }) => {
  const { open } = useOrderModal();
  return (
    <Button
      onClick={open}
      variant={variant === "primary" ? "default" : "outline"}
      size="lg"
      className={className}
      type="button"
    >
      {children}
    </Button>
  );
};
