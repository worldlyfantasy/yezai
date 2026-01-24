"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ModalContextValue {
  open: () => void;
  close: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return <ModalContext.Provider value={{ isOpen, open, close }}>{children}</ModalContext.Provider>;
};

export const useOrderModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useOrderModal must be used within ModalProvider");
  }
  return ctx;
};
