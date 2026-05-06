import {
  cadenceMarks,
  workflowSteps,
} from "@/components/sections/hermesContent";

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-transparent px-5 py-24 text-[var(--charcoal)] md:px-10 md:py-28 lg:px-24"
    >
      <div
        aria-hidden="true"
        className="absolute -left-1 top-0 font-serif text-[13.5rem] font-medium uppercase leading-[0.86] text-[var(--bone)] opacity-70"
      >
        Fluxo
      </div>
      <div
        aria-hidden="true"
        className="absolute left-[18%] top-[-3.5rem] h-[63rem] w-[51rem] rounded-[50%] border-l-[1.75rem] border-[rgba(201,169,110,0.16)]"
      />

      <div className="relative mx-auto max-w-[78rem]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,47.5rem)_25.875rem] lg:items-start">
          <div data-reveal>
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-[var(--mist)]">
              Como funciona
            </p>
            <h2 className="max-w-[47.5rem] text-balance font-serif text-[clamp(3rem,5.2vw,4.75rem)] font-medium leading-[0.94]">
              Da escolha do template ao site pronto para vender.
            </h2>
          </div>

          <div
            data-reveal
            className="relative min-h-60 overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[linear-gradient(135deg,rgba(201,169,110,0.38),rgba(231,227,216,0.75)),url('https://images.unsplash.com/photo-1695706807850-8c66b24b3413?auto=format&fit=crop&w=1080&q=80')] bg-cover bg-center"
          >
            <div className="absolute bottom-6 left-8 rounded-full border border-[var(--border)] bg-[var(--bone)] px-4 py-2 text-[11px] font-medium tracking-[0.12em] text-[var(--mist)]">
              referências, oferta e acabamento
            </div>
          </div>
        </div>

        <div
          data-reveal
          className="mt-14 grid gap-3 lg:grid-cols-[1fr_1.375rem_1fr_1.375rem_1fr_1.375rem_1fr] lg:items-center"
        >
          {workflowSteps.map((step, index) => (
            <div key={step.title} className="contents">
              <article
                className="group relative min-h-[17.875rem] overflow-hidden rounded-[1.875rem] border border-[var(--border)] bg-[var(--bone)] p-6 text-[var(--charcoal)] shadow-[0_18px_52px_rgba(26,29,38,0.05)] transition-[background,color,border-color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--charcoal)] hover:bg-[var(--charcoal)] hover:text-[var(--bone)] hover:shadow-[0_24px_66px_rgba(26,29,38,0.16)]"
              >
                <span
                  aria-hidden="true"
                  className="absolute bottom-[-1.4rem] left-2 font-serif text-[12.5rem] font-medium leading-none text-[var(--champagne)] opacity-15 transition-opacity duration-300 group-hover:opacity-25"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="relative font-serif text-3xl font-medium leading-[1.02]">
                  {step.title}
                </h3>
                <p className="relative mt-4 text-sm font-medium leading-[1.5] text-[var(--charcoal)] transition-colors duration-300 group-hover:text-[var(--bone)]">
                  {step.description}
                </p>
              </article>
              {index < workflowSteps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="hidden h-px bg-[var(--champagne)] lg:block"
                />
              ) : null}
            </div>
          ))}
        </div>

        <div
          data-reveal
          className="mt-10 grid gap-6 rounded-[1.75rem] border border-[var(--border)] bg-[var(--bone)] p-7 md:grid-cols-[17.875rem_1fr_1px_1fr_1px_1fr] md:items-center"
        >
          <h3 className="font-serif text-3xl font-medium leading-[1.05]">
            Um ritmo claro para publicar com critério.
          </h3>
          {cadenceMarks.map((mark, index) => (
            <div key={mark.label} className="contents">
              <div className="md:px-2">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--mist)]">
                  {mark.label}
                </p>
                <p className="mt-2 text-sm leading-[1.45] text-[var(--stone)]">
                  {mark.text}
                </p>
              </div>
              {index < cadenceMarks.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="hidden h-12 w-px bg-[var(--border)] md:block"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
