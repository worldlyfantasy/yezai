"use client";

import Image from "next/image";
import { useState } from "react";

const sizeMap = {
  sm: 40,
  md: 56,
  lg: 72,
  xl: 96
};

export const LogoMark = ({
  size = "lg",
  className = "",
}: {
  size?: keyof typeof sizeMap;
  className?: string;
}) => {
  const [failed, setFailed] = useState(false);
  const dimension = sizeMap[size];

  if (failed) {
    return (
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 80 80"
        className={className}
        aria-label="野哉"
        role="img"
      >
        <text
          x="40"
          y="50"
          textAnchor="middle"
          fontSize="36"
          fill="#993921"
          fontFamily="Songti SC, serif"
        >
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
