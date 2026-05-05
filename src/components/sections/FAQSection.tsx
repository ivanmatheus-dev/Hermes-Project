import { faqs } from "@/components/sections/hermesContent";

export function FAQSection() {
  return (
    <section
      id="faq"
      className="bg-[var(--bone)] px-5 py-24 text-[var(--charcoal)] md:px-10 md:py-32 lg:px-24"
    >
      <div className="mx-auto grid max-w-[78rem] gap-12 lg:grid-cols-[29.375rem_40.625rem] lg:justify-between">
        <div data-reveal>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.32em] text-[var(--mist)]">
            FAQ
          </p>
          <h2 className="max-w-[29.375rem] text-balance font-serif text-[clamp(3rem,5vw,4.5rem)] font-medium leading-[0.98]">
            Perguntas antes de começar.
          </h2>
        </div>
        <div className="border-t border-[var(--border)]">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              data-reveal
              className="group border-b border-[var(--border)] py-6"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-2xl leading-tight text-[var(--charcoal)] marker:hidden md:text-3xl">
                {faq.question}
                <span
                  aria-hidden="true"
                  className="grid h-9 w-9 shrink-0 place-items-center text-xl transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-[1.65] text-[var(--stone)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
