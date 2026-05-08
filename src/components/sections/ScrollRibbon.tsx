import type { PropsWithChildren, RefObject } from "react";

type ScrollRibbonProps = PropsWithChildren<{
  pathRef: RefObject<SVGPathElement | null>;
  stageRef: RefObject<HTMLDivElement | null>;
}>;

export function ScrollRibbon({
  children,
  pathRef,
  stageRef,
}: ScrollRibbonProps) {
  return (
    <div
      ref={stageRef}
      className="scroll-ribbon-stage mineral-paper relative overflow-hidden bg-[var(--mineral)] text-[var(--charcoal)]"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1440 1540"
        preserveAspectRatio="none"
        className="scroll-ribbon pointer-events-none absolute left-1/2 top-0 z-0 h-[calc(100%+9rem)] w-[min(112rem,138vw)] -translate-x-1/2 overflow-visible"
      >
        <path
          ref={pathRef}
          className="scroll-ribbon-path"
          d="M -120 80 C 54 34 98 86 140 208 C 180 326 196 412 260 424 C 330 438 374 377 492 388 C 626 400 690 432 816 418 C 942 404 1052 392 1178 426 C 1308 461 1362 530 1332 620 C 1298 724 1162 756 1030 842 C 906 923 850 994 736 1064 C 606 1144 540 1246 470 1398 C 438 1468 406 1516 356 1588"
        />
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
