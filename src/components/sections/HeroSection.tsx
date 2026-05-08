import type { MouseEvent, RefObject } from "react";

import { AnimatedHermesLogo } from "@/components/brand/AnimatedHermesLogo";
import { navItems, type ThemeMode } from "@/components/sections/hermesContent";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

type HeroSectionProps = {
  themeMode: ThemeMode;
  heroRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLElement | null>;
  wingRef: RefObject<SVGGElement | null>;
  entryOverlayRef: RefObject<HTMLDivElement | null>;
  entryLogoRef: RefObject<HTMLDivElement | null>;
  entryLineRef: RefObject<HTMLSpanElement | null>;
  heroCopyRef: RefObject<HTMLDivElement | null>;
  subheadlineRef: RefObject<HTMLParagraphElement | null>;
  ctasRef: RefObject<HTMLDivElement | null>;
  mockupRef: RefObject<HTMLDivElement | null>;
  onThemeToggle: () => void;
  onSectionLinkClick: (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => void;
};

export function HeroSection({
  themeMode,
  heroRef,
  headerRef,
  wingRef,
  entryOverlayRef,
  entryLogoRef,
  entryLineRef,
  heroCopyRef,
  subheadlineRef,
  ctasRef,
  mockupRef,
  onThemeToggle,
  onSectionLinkClick,
}: HeroSectionProps) {
  return (
    <section
      ref={heroRef}
      className="hero-scroll-stage mineral-paper relative min-h-screen overflow-hidden bg-[var(--mineral)] text-[var(--charcoal)]"
    >
      <div
        ref={entryOverlayRef}
        className="fixed inset-0 z-[80] grid place-items-center bg-[var(--mineral)] text-[var(--charcoal)]"
        aria-hidden="true"
      >
        <div className="entry-shell text-center">
          <div ref={entryLogoRef} className="mx-auto w-[min(42vw,17rem)]">
            <AnimatedHermesLogo wingRef={wingRef} className="h-auto w-full" />
          </div>
          <span
            ref={entryLineRef}
            className="mx-auto mt-8 block h-px w-24 bg-[var(--champagne)]"
          />
          <p className="mt-7 text-xs uppercase tracking-[0.34em] text-[var(--mist)]">
            Sites prontos para vender
          </p>
        </div>
      </div>

      <div
        aria-hidden="true"
        data-hero-decor
        className="pointer-events-none absolute left-0 top-1/2 h-px w-full bg-[rgba(231,227,216,0.3)]"
      />
      <div
        aria-hidden="true"
        data-hero-decor
        className="pointer-events-none absolute left-1/2 top-0 h-full w-px bg-[rgba(231,227,216,0.3)]"
      />
      <div
        aria-hidden="true"
        data-hero-decor
        className="pointer-events-none absolute -left-24 top-[40%] h-[30rem] w-[30rem] rounded-full border border-[rgba(201,169,110,0.22)]"
      />

      <div className="hero-scroll-stage__inner relative z-10 min-h-screen">
        <header
          ref={headerRef}
          className="absolute left-0 right-0 top-0 z-30 flex items-center justify-between gap-4 px-5 py-5 opacity-0 md:px-10 md:py-7 lg:px-[5.5rem]"
        >
          <a
            href="#top"
            className="flex items-center gap-3 text-[var(--charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
            aria-label="Hermes, voltar ao início"
          >
            <span className="font-serif text-[1.9rem] leading-none">Hermes</span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-[var(--stone)] md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                data-nav-item
                onClick={(event) => onSectionLinkClick(event, item.href)}
                className="transition-colors duration-300 hover:text-[var(--charcoal)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={
                themeMode === "light" ? "Ativar modo escuro" : "Ativar modo claro"
              }
              aria-pressed={themeMode === "dark"}
              onClick={onThemeToggle}
              className="theme-toggle grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--charcoal)] transition-[background,transform] duration-300 hover:-translate-y-0.5 hover:bg-[rgba(231,227,216,0.52)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
            >
              <span aria-hidden="true" className="theme-toggle__mark" />
            </button>
            <a
              href="#templates"
              data-nav-item
              onClick={(event) => onSectionLinkClick(event, "#templates")}
              className="hidden border border-[var(--border)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)] transition-[background,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--charcoal)] hover:text-[var(--bone)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)] md:block"
            >
              Ver projetos
            </a>
          </div>
        </header>

        <main
          id="top"
          className="mx-auto grid min-h-screen max-w-[78rem] items-end gap-8 px-5 pb-8 pt-28 md:grid-cols-[minmax(0,38.125rem)_minmax(24rem,37.125rem)] md:items-center md:justify-between md:px-10 md:pb-0 md:pt-24 lg:px-0"
        >
          <div ref={heroCopyRef} className="order-1 max-w-[38.125rem] opacity-0 md:order-none">
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-[var(--mist)]">
              Templates premium
            </p>
            <h1 className="text-balance font-serif text-[clamp(3.2rem,5vw,4.375rem)] font-medium leading-[0.96] text-[var(--charcoal)]">
              Sites prontos para vender, com acabamento sob medida.
            </h1>
          </div>

          <div className="order-3 md:order-none md:row-span-2 md:self-center">
            <div
              ref={mockupRef}
              className="hero-mockup-shell ml-auto w-full max-w-[37.125rem] opacity-0"
            >
              <BrowserMockup />
            </div>
          </div>

          <div className="order-2 max-w-[36.875rem] self-start md:order-none md:col-start-1">
            <p
              ref={subheadlineRef}
              className="text-base leading-8 text-[var(--stone)] opacity-0 md:text-lg md:leading-[1.75]"
            >
              Escolha um template premium, personalize para o seu nicho e coloque
              sua presença digital no ar com velocidade, clareza e foco em
              conversão.
            </p>
            <div ref={ctasRef} className="mt-8 flex flex-col gap-3 opacity-0 sm:flex-row">
              <a
                href="#templates"
                onClick={(event) => onSectionLinkClick(event, "#templates")}
                className="border border-[var(--charcoal)] bg-[var(--charcoal)] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--bone)] transition-[background,color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-[rgba(26,29,38,0.92)] hover:shadow-[0_16px_40px_rgba(26,29,38,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
              >
                Ver projetos disponíveis
              </a>
              <a
                href="#contato"
                onClick={(event) => onSectionLinkClick(event, "#contato")}
                className="border border-[var(--border)] px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)] transition-[background,transform] duration-300 hover:-translate-y-1 hover:bg-[rgba(231,227,216,0.52)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
              >
                Conversar sobre meu site
              </a>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
