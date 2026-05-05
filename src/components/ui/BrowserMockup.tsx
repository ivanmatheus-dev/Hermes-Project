type BrowserMockupProps = {
  className?: string;
};

export function BrowserMockup({ className }: BrowserMockupProps) {
  return (
    <article
      aria-label="Preview de site Hermes"
      className={[
        "overflow-hidden rounded-[1.375rem] border border-[var(--border)] bg-[var(--bone)]",
        "shadow-[0_30px_80px_rgba(26,29,38,0.14)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="relative h-14 border-b border-[var(--border)] bg-[rgba(236,231,220,0.72)] px-6">
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

      <div className="p-6">
        <div className="relative min-h-[19.875rem] overflow-hidden rounded-[1.125rem] border border-[var(--border)] bg-[rgba(241,237,227,0.86)] p-[1.125rem]">
          <div className="relative grid min-h-[17.625rem] overflow-hidden rounded-[0.875rem] border border-[rgba(201,194,180,0.45)] bg-[var(--mineral)] md:grid-cols-[0.92fr_1.08fr]">
            <div className="flex flex-col justify-center p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--champagne)]">
                Scroll / oferta
              </p>
              <h2 className="mt-4 max-w-[13rem] font-serif text-[2.25rem] font-medium leading-[0.98] text-[var(--charcoal)]">
                Design que gera resultado
              </h2>
              <p className="mt-5 max-w-[15rem] text-xs leading-5 text-[var(--stone)]">
                O mock cresce como superfície, abrindo espaço para o próximo
                scroll sem quebrar a narrativa visual.
              </p>
            </div>

            <div className="relative min-h-[14rem] overflow-hidden bg-[var(--charcoal)]">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(201,169,110,0.75),transparent_42%),linear-gradient(135deg,rgba(231,227,216,0.08),rgba(201,169,110,0.16))]"
              />
              <div className="absolute left-8 top-9 h-px w-12 bg-[var(--champagne)]" />
              <div className="absolute left-8 top-[4.25rem] h-px w-20 bg-[rgba(231,227,216,0.45)]" />
              <div className="absolute right-10 top-[4.1rem] w-[8.25rem] rounded-[0.9rem] bg-[var(--bone)] p-4 shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
                <span className="block h-1 w-12 rounded-full bg-[var(--champagne)]" />
                <span className="mt-5 block h-8 rounded-md bg-[var(--charcoal)]" />
                <span className="mt-3 block h-2 w-16 rounded-full bg-[rgba(26,29,38,0.18)]" />
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-3 text-[10px] font-medium text-[var(--mist)]">
            <span className="h-px w-14 bg-[rgba(201,169,110,0.6)]" aria-hidden="true" />
            continuidade no scroll
          </div>
        </div>
      </div>
    </article>
  );
}
