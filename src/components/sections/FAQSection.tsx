"use client";

import { useState } from "react";

import { faqs } from "@/components/sections/hermesContent";

export function FAQSection() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

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
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              data-reveal
              data-faq-item
              className="group border-b border-[var(--border)] py-6"
              onMouseEnter={() => setOpenQuestion(faq.question)}
              onMouseLeave={() => setOpenQuestion(null)}
              onFocus={() => setOpenQuestion(faq.question)}
              onBlur={(event) => {
                const nextFocusTarget = event.relatedTarget;

                if (
                  !(nextFocusTarget instanceof Node) ||
                  !event.currentTarget.contains(nextFocusTarget)
                ) {
                  setOpenQuestion(null);
                }
              }}
            >
              <button
                type="button"
                aria-expanded={openQuestion === faq.question}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenQuestion(faq.question)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 text-left font-serif text-2xl leading-tight text-[var(--charcoal)] transition-colors duration-300 hover:text-[var(--stone)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)] md:text-3xl"
              >
                {faq.question}
                <span
                  aria-hidden="true"
                  className={[
                    "grid h-9 w-9 shrink-0 place-items-center text-xl transition-transform duration-300",
                    openQuestion === faq.question ? "rotate-45" : "",
                  ].join(" ")}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${index}`}
                aria-hidden={openQuestion !== faq.question}
                className={[
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                  openQuestion === faq.question
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p
                    data-state={openQuestion === faq.question ? "open" : "closed"}
                    className="mt-4 max-w-3xl text-sm leading-[1.65] text-[var(--stone)]"
                  >
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
