"use client";

import Image from "next/image";
import { useState } from "react";

const sizeMap = {
  sm: 32,
  md: 48,
  lg: 64
};

export const LogoMark = ({ size = "sm", className = "" }: { size?: keyof typeof sizeMap; className?: string }) => {
  const [failed, setFailed] = useState(false);
  const dimension = sizeMap[size];

  if (failed) {
    return (
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 80 80"
        className={className}
        aria-label="野哉章"
      >
        <rect x="4" y="4" width="72" height="72" rx="12" fill="#993921" opacity="0.9" />
        <text x="40" y="46" textAnchor="middle" fontSize="28" fill="#fdf8f0" fontFamily="Songti SC, serif">
          野哉
        </text>
      </svg>
    );
  }

  return (
    <Image
      src="/yezai.png"
      alt="野哉"
      width={dimension}
      height={dimension}
      className={className}
      onError={() => setFailed(true)}
      priority
    />
  );
};
