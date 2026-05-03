import type { Ref } from "react";

type AnimatedHermesLogoProps = {
  className?: string;
  wingRef?: Ref<SVGGElement>;
  title?: string;
};

export function AnimatedHermesLogo({
  className,
  wingRef,
  title = "Hermes",
}: AnimatedHermesLogoProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 220 220"
      role="img"
      aria-labelledby="hermes-logo-title"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="hermes-logo-title">{title}</title>
      <g
        className="speed-lines"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="8"
        opacity="0.72"
      >
        <path d="M64 54L103 26" />
        <path d="M92 58L132 30" />
      </g>
      <g
        className="boot"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="10"
      >
        <path d="M56 94L46 136L24 169C29 183 41 189 58 188H83L116 164L150 151L161 134L151 116" />
        <path d="M56 94C82 78 109 60 137 37C147 29 154 21 160 14C164 40 158 62 140 80" />
      </g>
      <g
        ref={wingRef}
        className="wing"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="9"
      >
        <path d="M124 88C149 74 166 55 181 35C184 60 173 82 146 101" />
        <path d="M118 116C140 104 159 92 176 77C171 102 154 119 126 127" />
        <path d="M118 139C139 138 154 132 168 120C158 143 140 155 113 154" />
      </g>
    </svg>
  );
}
