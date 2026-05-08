import type { MouseEvent, RefObject } from "react";

import { AnimatedHermesLogo } from "@/components/brand/AnimatedHermesLogo";

type ContactSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  onSectionLinkClick: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
};

export function ContactSection({
  sectionRef,
  onSectionLinkClick,
}: ContactSectionProps) {
  return (
    <section
      ref={sectionRef}
      id="contato"
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--charcoal)] px-5 py-14 text-[var(--bone)] md:px-10 md:py-16 lg:px-24 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] top-10 h-px bg-[rgba(201,169,110,0.42)] md:top-14"
      />
      <div className="mx-auto max-w-[74rem] text-center" data-reveal>
        <AnimatedHermesLogo className="mx-auto h-16 w-16 text-[var(--champagne)] md:h-[4.5rem] md:w-[4.5rem]" />
        <p className="mt-7 text-xs uppercase tracking-[0.34em] text-[rgba(231,227,216,0.62)]">
          Próximo passo
        </p>
        <h2 className="mx-auto mt-5 max-w-5xl text-balance font-serif text-[clamp(2.45rem,6vw,5rem)] font-medium leading-[0.92]">
          Seu site pode parecer pronto para vender antes da próxima semana acabar.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[rgba(231,227,216,0.74)] md:text-lg md:leading-8">
          Se a sua marca já tem uma boa oferta, ela merece uma página que
          apresente isso com força, elegância e intenção comercial.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://wa.me/"
            className="border border-[var(--champagne)] bg-[rgba(201,169,110,0.12)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bone)] transition-[background,color,transform,box-shadow] duration-300 hover:scale-[1.03] hover:bg-[var(--champagne)] hover:text-[var(--charcoal)] hover:shadow-[0_18px_46px_rgba(201,169,110,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bone)]"
          >
            Chamar no WhatsApp
          </a>
          <a
            href="#templates"
            onClick={(event) => onSectionLinkClick(event, "#templates")}
            className="border border-[rgba(231,227,216,0.22)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bone)] transition-[background,color,transform,box-shadow] duration-300 hover:scale-[1.03] hover:bg-[var(--champagne)] hover:text-[var(--charcoal)] hover:shadow-[0_18px_46px_rgba(201,169,110,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bone)]"
          >
            Rever projetos
          </a>
        </div>
      </div>
    </section>
  );
}
