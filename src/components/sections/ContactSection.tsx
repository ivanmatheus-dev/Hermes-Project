import type { MouseEvent } from "react";

import { AnimatedHermesLogo } from "@/components/brand/AnimatedHermesLogo";

type ContactSectionProps = {
  onSectionLinkClick: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
};

export function ContactSection({ onSectionLinkClick }: ContactSectionProps) {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[var(--charcoal)] px-5 py-24 text-[var(--bone)] md:px-10 md:py-32 lg:px-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10%] top-16 h-px bg-[rgba(201,169,110,0.42)]"
      />
      <div className="mx-auto max-w-[74rem] text-center" data-reveal>
        <AnimatedHermesLogo className="mx-auto h-20 w-20 text-[var(--champagne)]" />
        <p className="mt-9 text-xs uppercase tracking-[0.34em] text-[rgba(231,227,216,0.62)]">
          Próximo passo
        </p>
        <h2 className="mx-auto mt-6 max-w-5xl text-balance font-serif text-[clamp(2.8rem,7vw,6.8rem)] font-medium leading-[0.9]">
          Seu site pode parecer pronto para vender antes da próxima semana acabar.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-[rgba(231,227,216,0.74)] md:text-lg">
          Se a sua marca já tem uma boa oferta, ela merece uma página que
          apresente isso com força, elegância e intenção comercial.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href="https://wa.me/"
            className="border border-[var(--champagne)] bg-[var(--champagne)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_46px_rgba(201,169,110,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bone)]"
          >
            Chamar no WhatsApp
          </a>
          <a
            href="#templates"
            onClick={(event) => onSectionLinkClick(event, "#templates")}
            className="border border-[rgba(231,227,216,0.22)] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bone)] transition-[background,transform] duration-300 hover:-translate-y-1 hover:bg-[rgba(231,227,216,0.08)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--bone)]"
          >
            Rever projetos
          </a>
        </div>
      </div>
    </section>
  );
}
