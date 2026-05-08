import { aboutMetrics } from "@/components/sections/hermesContent";

type BrowserMockupProps = {
  className?: string;
};

export function BrowserMockup({ className }: BrowserMockupProps) {
  return (
    <article
      aria-label="Preview da próxima seção Hermes"
      className={[
        "overflow-hidden rounded-[1.375rem] border border-[var(--border)] bg-[var(--bone)]",
        "shadow-[0_30px_80px_rgba(26,29,38,0.14)]",
        "hero-browser-mask",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="hero-browser-chrome relative h-14 border-b border-[var(--border)] bg-[rgba(236,231,220,0.72)] px-6">
        <div className="absolute left-6 top-1/2 flex -translate-y-1/2 gap-3" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--champagne)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[rgba(201,194,180,0.9)]" />
          <span className="h-1.5 w-1.5 rounded-full bg-[rgba(184,170,138,0.8)]" />
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-7 w-[min(16rem,42vw)] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-[rgba(201,194,180,0.6)] bg-[rgba(246,242,232,0.9)] px-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--champagne)]" aria-hidden="true" />
          <span className="truncate text-[11px] font-medium text-[var(--stone)]">
            hermes.design/templates
          </span>
        </div>
        <p className="absolute right-6 top-1/2 hidden -translate-y-1/2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--mist)] sm:block">
          Scroll preview
        </p>
      </div>

      <div className="hero-browser-body p-6">
        <div className="hero-browser-stage relative min-h-[19.875rem] overflow-hidden rounded-[1.125rem] border border-[var(--border)] bg-[rgba(241,237,227,0.86)] p-[1.125rem]">
          <div
            aria-hidden="true"
            className="hero-browser-glow absolute inset-0 bg-[radial-gradient(circle_at_88%_16%,rgba(201,169,110,0.22),transparent_18rem)]"
          />
          <div className="hero-browser-viewport relative min-h-[17.625rem] overflow-hidden rounded-[0.875rem] border border-[rgba(201,194,180,0.45)] bg-[var(--mineral)]">
            <div
              aria-hidden="true"
              className="hero-browser-depth absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,110,0.18),transparent_36rem),linear-gradient(135deg,rgba(231,227,216,0.08),rgba(26,29,38,0.1))]"
            />
            <div
              aria-hidden="true"
              className="hero-browser-arc absolute left-1/2 top-6 h-[34rem] w-[18rem] -translate-x-[18%] rounded-[50%] border-l-[0.875rem] border-[rgba(201,169,110,0.14)]"
            />
            <div className="hero-browser-preview-grid relative grid min-h-[17.625rem] gap-5 p-7 pb-16 md:grid-cols-[1.05fr_0.95fr]">
              <div className="hero-browser-left flex flex-col justify-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--champagne)]">
                  Próxima seção / sobre
                </p>
                <h2 className="mt-4 max-w-[18rem] font-serif text-[2.25rem] font-medium leading-[0.98] text-[var(--charcoal)]">
                  Presença digital com aparência de marca confiável.
                </h2>
                <p className="mt-5 max-w-[18.5rem] text-xs leading-5 text-[var(--stone)]">
                  O browser deixa de ser ilustração e vira uma janela para a
                  próxima parte da página.
                </p>
              </div>

              <div className="hero-browser-right flex flex-col justify-center gap-3">
                {aboutMetrics.map((metric, index) => (
                  <div
                    key={metric.value}
                    className={[
                      "rounded-[0.95rem] border px-4 py-3",
                      metric.featured
                        ? "border-[var(--charcoal)] bg-[var(--charcoal)] text-[var(--bone)]"
                        : "border-[var(--border)] bg-[var(--bone)] text-[var(--charcoal)]",
                    ].join(" ")}
                  >
                    <p className="font-serif text-[1.55rem] font-medium leading-none">
                      {metric.value}
                    </p>
                    <p
                      className={[
                        "mt-2 line-clamp-2 text-[10px] leading-4",
                        metric.featured
                          ? "text-[rgba(231,227,216,0.76)]"
                          : "text-[var(--stone)]",
                      ].join(" ")}
                    >
                      {index === 0
                        ? "primeira impressão forte e pronta para ser ampliada"
                        : metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-browser-footnote absolute bottom-5 left-7 right-7 flex items-center justify-between border-t border-[rgba(201,169,110,0.32)] pt-3 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--mist)]">
              <span>Zoom narrativo</span>
              <span>Seção #sobre</span>
            </div>

          </div>
          <div className="hero-browser-continuity mt-4 flex items-center justify-center gap-3 text-[10px] font-medium text-[var(--mist)]">
            <span className="h-px w-14 bg-[rgba(201,169,110,0.6)]" aria-hidden="true" />
            continuidade no scroll
          </div>
        </div>
      </div>
    </article>
  );
}
