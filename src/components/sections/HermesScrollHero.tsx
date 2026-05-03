"use client";

import { useRef, type MouseEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { AnimatedHermesLogo } from "@/components/brand/AnimatedHermesLogo";
import { TemplateShowcase } from "@/components/sections/TemplateShowcase";
import { BrowserMockup } from "@/components/ui/BrowserMockup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const navItems = ["Templates", "Como funciona", "Sob medida", "FAQ"];

export function HermesScrollHero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const templatesRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const logoMarkRef = useRef<HTMLDivElement | null>(null);
  const wingRef = useRef<SVGGElement | null>(null);
  const introTextRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);

  const scrollToTemplates = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    templatesRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useGSAP(
    () => {
      const shouldReduceMotion =
        prefersReducedMotion ||
        (typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches);

      if (shouldReduceMotion || !sectionRef.current) {
        return;
      }

      const section = sectionRef.current;
      const navElements = headerRef.current?.querySelectorAll("[data-nav-item]");
      let wingTween: gsap.core.Tween | null = null;
      let wingIsFlapping = false;

      const startWingFlap = () => {
        if (wingIsFlapping || !wingRef.current) {
          return;
        }

        wingIsFlapping = true;
        wingTween = gsap.to(wingRef.current, {
          rotation: -8,
          yoyo: true,
          repeat: -1,
          duration: 0.22,
          ease: "sine.inOut",
          transformOrigin: "28% 70%",
        });
      };

      const stopWingFlap = () => {
        if (!wingIsFlapping) {
          return;
        }

        wingIsFlapping = false;
        wingTween?.kill();
        wingTween = null;

        if (wingRef.current) {
          gsap.to(wingRef.current, {
            rotation: 0,
            duration: 0.18,
            ease: "sine.out",
            transformOrigin: "28% 70%",
          });
        }
      };

      const setSharedInitialState = () => {
        gsap.set(logoMarkRef.current, {
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });
        gsap.set(headerRef.current, { opacity: 0, y: -12 });
        gsap.set(navElements ?? [], { opacity: 0, y: -8 });
        gsap.set([headlineRef.current, subheadlineRef.current, ctasRef.current], {
          opacity: 0,
          y: 24,
        });
        gsap.set(introTextRef.current, { opacity: 1, y: 0 });
      };

      const media = gsap.matchMedia();

      media.add("(min-width: 768px)", () => {
        setSharedInitialState();
        gsap.set(mockupRef.current, {
          x: 220,
          rotation: 7,
          scale: 0.9,
          opacity: 0.55,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              if (self.progress > 0.85 || self.progress < 0.03) {
                stopWingFlap();
              } else {
                startWingFlap();
              }
            },
          },
        });

        timeline
          .to(
            logoMarkRef.current,
            {
              x: () => -window.innerWidth / 2 + 96,
              y: () => -window.innerHeight * 0.42 + 60,
              scale: 0.22,
              ease: "power2.inOut",
              duration: 0.54,
            },
            0,
          )
          .to(
            introTextRef.current,
            { opacity: 0, y: -12, ease: "power1.out", duration: 0.22 },
            0.04,
          )
          .to(
            headerRef.current,
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.28 },
            0.28,
          )
          .to(
            navElements ?? [],
            {
              opacity: 1,
              y: 0,
              stagger: 0.035,
              ease: "power2.out",
              duration: 0.22,
            },
            0.34,
          )
          .to(
            mockupRef.current,
            {
              x: 0,
              rotation: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              duration: 0.58,
            },
            0.16,
          )
          .to(
            headlineRef.current,
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.28 },
            0.36,
          )
          .to(
            subheadlineRef.current,
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.24 },
            0.46,
          )
          .to(
            ctasRef.current,
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.2 },
            0.54,
          );

        return () => {
          stopWingFlap();
        };
      });

      media.add("(max-width: 767px)", () => {
        setSharedInitialState();
        gsap.set(mockupRef.current, {
          x: 0,
          y: 72,
          rotation: 0,
          scale: 0.94,
          opacity: 0.5,
          transformOrigin: "50% 50%",
          willChange: "transform, opacity",
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              if (self.progress > 0.82 || self.progress < 0.05) {
                stopWingFlap();
              } else {
                startWingFlap();
              }
            },
          },
        });

        timeline
          .to(
            logoMarkRef.current,
            {
              x: () => -window.innerWidth / 2 + 62,
              y: () => -window.innerHeight * 0.42 + 58,
              scale: 0.24,
              ease: "power2.inOut",
              duration: 0.5,
            },
            0,
          )
          .to(
            introTextRef.current,
            { opacity: 0, y: -10, ease: "power1.out", duration: 0.2 },
            0.04,
          )
          .to(
            headerRef.current,
            { opacity: 1, y: 0, ease: "power2.out", duration: 0.26 },
            0.24,
          )
          .to(
            [headlineRef.current, subheadlineRef.current, ctasRef.current],
            {
              opacity: 1,
              y: 0,
              stagger: 0.06,
              ease: "power2.out",
              duration: 0.28,
            },
            0.32,
          )
          .to(
            mockupRef.current,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.out",
              duration: 0.36,
            },
            0.48,
          );

        return () => {
          stopWingFlap();
        };
      });

      return () => {
        stopWingFlap();
        media.revert();
      };
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  const finalState = prefersReducedMotion;

  return (
    <>
      <section
        ref={sectionRef}
        className={[
          "mineral-paper relative bg-[var(--mineral)] text-[var(--charcoal)]",
          finalState ? "min-h-screen" : "min-h-[220vh]",
        ].join(" ")}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-[42%] h-[34rem] w-[34rem] rounded-full border border-[rgba(201,169,110,0.22)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-15rem] left-[-10rem] h-[30rem] w-[30rem] rounded-full bg-[rgba(231,227,216,0.46)]"
          />

          <header
            ref={headerRef}
            className={[
              "absolute left-0 right-0 top-0 z-30 flex items-center justify-between px-5 py-5 md:px-10 md:py-7",
              finalState ? "opacity-100" : "opacity-0",
            ].join(" ")}
          >
            <div className="flex items-center gap-3 pl-24">
              <span className="font-serif text-2xl leading-none text-[var(--charcoal)]">
                Hermes
              </span>
            </div>
            <nav className="hidden items-center gap-8 text-sm text-[var(--stone)] md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={item === "Templates" ? "#templates" : "#"}
                  data-nav-item
                  onClick={item === "Templates" ? scrollToTemplates : undefined}
                  className="transition-colors duration-300 hover:text-[var(--charcoal)]"
                >
                  {item}
                </a>
              ))}
            </nav>
            <a
              href="#templates"
              data-nav-item
              onClick={scrollToTemplates}
              className="hidden border border-[var(--border)] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--charcoal)] transition-[background,color,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--charcoal)] hover:text-[var(--bone)] md:block"
            >
              Ver templates
            </a>
          </header>

          <div
            ref={logoMarkRef}
            className={[
              "absolute z-40 text-[var(--charcoal)] will-change-transform",
              finalState
                ? "left-6 top-5 scale-[0.24] md:left-10 md:top-7 md:scale-[0.22]"
                : "left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2",
            ].join(" ")}
          >
            <AnimatedHermesLogo
              wingRef={wingRef}
              className="h-[45vw] max-h-64 min-h-40 w-auto md:h-72"
            />
          </div>

          <div
            ref={introTextRef}
            className={[
              "absolute left-1/2 top-[58%] z-20 w-full max-w-xl -translate-x-1/2 px-6 text-center",
              finalState ? "opacity-0" : "opacity-100",
            ].join(" ")}
          >
            <h1 className="font-sans text-5xl font-normal leading-none text-[var(--charcoal)] md:text-7xl">
              Hermes
            </h1>
            <span className="mx-auto mt-10 block h-px w-16 bg-[var(--champagne)]" />
            <p className="mx-auto mt-8 max-w-sm font-serif text-3xl leading-tight tracking-[0.18em] text-[var(--charcoal)] md:text-4xl">
              Sites prontos para vender
            </p>
          </div>

          <main className="relative z-10 grid h-full items-end gap-8 px-5 pb-8 pt-28 md:grid-cols-[0.95fr_1.05fr] md:items-center md:px-10 md:pb-0 md:pt-24 lg:px-16">
            <div
              ref={headlineRef}
              className={[
                "order-1 max-w-3xl md:order-none md:pt-12",
                finalState ? "opacity-100" : "opacity-0",
              ].join(" ")}
            >
              <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[var(--mist)]">
                Templates premium
              </p>
              <h2 className="text-balance font-serif text-[clamp(2.8rem,5.7vw,5.3rem)] font-medium leading-[0.96] text-[var(--charcoal)]">
                Sites prontos para vender, com{" "}
                <em className="font-normal italic">acabamento</em> sob medida.
              </h2>
            </div>

            <div className="order-3 md:order-none md:row-span-2 md:self-center">
              <div
                ref={mockupRef}
                className={[
                  "ml-auto w-full max-w-[47rem] will-change-transform",
                  finalState ? "opacity-100" : "opacity-55",
                ].join(" ")}
              >
                <BrowserMockup />
              </div>
            </div>

            <div className="order-2 max-w-2xl self-start md:order-none md:col-start-1">
              <p
                ref={subheadlineRef}
                className={[
                  "text-base leading-8 text-[var(--stone)] md:text-lg",
                  finalState ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                Escolha um template premium, personalize para o seu nicho e
                coloque sua presença digital no ar com velocidade, clareza e foco
                em conversão.
              </p>
              <div
                ref={ctasRef}
                className={[
                  "mt-8 flex flex-col gap-3 sm:flex-row",
                  finalState ? "opacity-100" : "opacity-0",
                ].join(" ")}
              >
                <a
                  href="#templates"
                  onClick={scrollToTemplates}
                  className="border border-[var(--charcoal)] bg-[var(--charcoal)] px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--bone)] transition-[background,color,transform,box-shadow] duration-300 hover:-translate-y-1 hover:bg-[rgba(26,29,38,0.92)] hover:shadow-[0_16px_40px_rgba(26,29,38,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
                >
                  Ver templates disponíveis
                </a>
                <a
                  href="#auditoria"
                  className="border border-[var(--border)] px-5 py-3 text-center text-xs font-medium uppercase tracking-[0.2em] text-[var(--charcoal)] transition-[background,transform] duration-300 hover:-translate-y-1 hover:bg-[rgba(231,227,216,0.52)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
                >
                  Receber auditoria do meu site
                </a>
              </div>
            </div>
          </main>
        </div>
      </section>

      <TemplateShowcase
        sectionRef={templatesRef}
        prefersReducedMotion={prefersReducedMotion}
      />
    </>
  );
}
