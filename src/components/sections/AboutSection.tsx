import {
  aboutMetrics,
  methodLenses,
} from "@/components/sections/hermesContent";

export function AboutSection() {
  return (
    <section
      id="sobre"
      className="about-mask-reveal relative z-0 overflow-hidden bg-[var(--bone)] px-5 py-24 text-[var(--charcoal)] md:px-10 md:py-28 lg:px-24"
    >
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-6 h-[66rem] w-[38rem] -translate-x-[26%] rounded-[50%] border-l-[1.875rem] border-[rgba(201,169,110,0.12)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[17%] top-16 hidden h-[45rem] w-[70rem] rounded-[3.5rem] border border-[var(--border)] bg-[rgba(221,216,205,0.22)] opacity-60 lg:block"
      />

      <div className="relative mx-auto max-w-[78rem] border-t border-[rgba(201,169,110,0.4)] pt-12">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,42rem)_30.75rem] lg:items-start">
          <div data-reveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-[var(--mist)]">
              Presença digital que vende
            </p>
            <h2 className="max-w-[43.125rem] text-balance font-serif text-[clamp(3rem,4.6vw,4.125rem)] font-medium leading-[0.96]">
              A Hermes coloca sua empresa na internet com aparência de marca
              confiável.
            </h2>
            <div className="mt-9 max-w-[32.5rem] space-y-7 text-base leading-[1.68] text-[var(--stone)] md:text-[1.0625rem]">
              <p>
                Seu site precisa fazer mais do que existir: ele precisa
                apresentar valor, reduzir desconfiança e transformar visitantes
                em conversas comerciais.
              </p>
              <p>
                Criamos vitrines digitais para negócios que querem parecer
                profissionais rápido, comunicar com clareza e gerar mais pedidos
                sem depender só de indicação.
              </p>
            </div>
            <div className="mt-9 inline-flex items-center gap-3 rounded-full bg-[var(--charcoal)] px-4 py-3 text-xs font-medium tracking-[0.08em] text-[var(--bone)]">
              <span className="h-2 w-2 rounded-[0.25rem] bg-[var(--champagne)]" />
              Websites premium para vender com mais confiança
            </div>
          </div>

          <aside
            data-reveal
            className="rounded-[2.25rem] border border-[var(--border)] bg-[rgba(221,216,205,0.6)] p-7"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-[var(--mist)]">
              Como a Hermes te exibe
            </p>
            <h3 className="mt-5 font-serif text-[2.3rem] font-medium leading-[1.02]">
              Um site funciona como seu vendedor mais elegante.
            </h3>
            <p className="mt-5 text-sm leading-[1.7] text-[var(--stone)]">
              A estrutura combina design premium, copy persuasiva e caminhos de
              contato para aumentar confiança e facilitar a decisão do cliente.
            </p>
            <div className="mt-6 space-y-2.5">
              {methodLenses.map((lens, index) => (
                <div
                  key={lens}
                  className="flex items-center gap-3 rounded-[1.375rem] border border-[var(--border)] bg-[var(--bone)] px-4 py-3 text-sm text-[var(--charcoal)]"
                >
                  <span
                    className={[
                      "h-4 w-4 rounded-full",
                      index === 1 ? "bg-[var(--champagne)]" : "bg-[var(--charcoal)]",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                  {lens}
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div
          data-reveal
          className="mt-20 grid gap-4 md:grid-cols-3 lg:mt-28"
        >
          {aboutMetrics.map((metric) => (
            <article
              key={metric.value}
              className="group rounded-[1.75rem] border border-[var(--border)] bg-[var(--bone)] p-7 text-[var(--charcoal)] shadow-[0_18px_50px_rgba(26,29,38,0.06)] transition-[background,color,border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--bone)] hover:shadow-[0_24px_64px_rgba(26,29,38,0.14)]"
            >
              <p className="font-serif text-[2.625rem] font-medium leading-none">
                {metric.value}
              </p>
              <p className="mt-4 text-sm font-medium leading-[1.6] text-[var(--charcoal)] transition-colors duration-300 group-hover:text-[var(--bone)]">
                {metric.label}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
