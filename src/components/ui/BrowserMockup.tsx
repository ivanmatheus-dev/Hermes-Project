type BrowserMockupProps = {
  className?: string;
};

export function BrowserMockup({ className }: BrowserMockupProps) {
  return (
    <article
      aria-label="Preview de site Hermes"
      className={[
        "overflow-hidden rounded-[14px] border border-[var(--border)] bg-[var(--bone)]",
        "shadow-[0_24px_70px_rgba(26,29,38,0.10)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex h-11 items-center justify-between border-b border-[var(--border)] px-5">
        <div className="flex items-center gap-2" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[rgba(26,29,38,0.18)]" />
          <span className="h-2 w-2 rounded-full bg-[rgba(26,29,38,0.14)]" />
          <span className="h-2 w-2 rounded-full bg-[rgba(201,169,110,0.58)]" />
        </div>
        <div className="hidden items-center gap-7 text-[11px] text-[var(--mist)] md:flex">
          <span>Estrutura</span>
          <span>Projetos</span>
          <span>Contato</span>
        </div>
      </div>

      <div className="grid min-h-[360px] gap-8 p-6 md:min-h-[430px] md:grid-cols-[0.92fr_1.08fr] md:p-9">
        <div className="flex flex-col justify-center">
          <span className="mb-5 h-px w-14 bg-[var(--champagne)]" />
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-[var(--mist)]">
            Template premium
          </p>
          <h2 className="font-serif text-4xl leading-[1.02] text-[var(--charcoal)] md:text-5xl">
            Design que gera resultado.
          </h2>
          <p className="mt-5 max-w-[23rem] text-sm leading-7 text-[var(--stone)]">
            Sites estratégicos, rápidos e profissionais para quem leva o
            negócio a sério.
          </p>
          <span className="mt-8 w-max border-b border-[var(--champagne)] pb-1 text-xs font-medium text-[var(--charcoal)]">
            Ver projetos
          </span>
        </div>

        <div className="relative min-h-[260px] overflow-hidden rounded-lg border border-[var(--border)] bg-[rgba(221,216,205,0.58)]">
          <div className="absolute inset-5 border border-[rgba(26,29,38,0.08)]" />
          <div className="absolute left-8 top-8 h-24 w-32 rounded-sm bg-[rgba(201,169,110,0.16)]" />
          <div className="absolute bottom-8 right-8 h-48 w-52 rounded-sm bg-[rgba(26,29,38,0.08)]" />
          <div className="absolute right-16 top-14 h-32 w-px rotate-45 bg-[rgba(231,227,216,0.88)]" />
          <div className="absolute bottom-20 left-10 h-px w-40 bg-[rgba(201,169,110,0.52)]" />
        </div>
      </div>
    </article>
  );
}
