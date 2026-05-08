"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TemplateShowcase } from "@/components/sections/TemplateShowcase";
import { type ThemeMode } from "@/components/sections/hermesContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const mediaMatches = (query: string) =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(query).matches;

const getStoredTheme = () => {
  if (
    typeof window === "undefined" ||
    typeof window.localStorage?.getItem !== "function"
  ) {
    return null;
  }

  try {
    return window.localStorage.getItem("hermes-theme");
  } catch {
    return null;
  }
};

const setStoredTheme = (themeMode: ThemeMode) => {
  if (
    typeof window === "undefined" ||
    typeof window.localStorage?.setItem !== "function"
  ) {
    return;
  }

  try {
    window.localStorage.setItem("hermes-theme", themeMode);
  } catch {
    // Some embedded previews and test environments disable storage.
  }
};

export function HermesScrollHero() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pageRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const templatesRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const wingRef = useRef<SVGGElement | null>(null);
  const entryOverlayRef = useRef<HTMLDivElement | null>(null);
  const entryLogoRef = useRef<HTMLDivElement | null>(null);
  const entryLineRef = useRef<HTMLSpanElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);
  const mockupEntryRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  const scrollToSection = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) {
      return;
    }

    event.preventDefault();
    const target =
      href === "#templates"
        ? templatesRef.current
        : document.querySelector<HTMLElement>(href);

    target?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const storedTheme = getStoredTheme();
    const prefersDark = mediaMatches("(prefers-color-scheme: dark)");
    const nextTheme =
      storedTheme === "dark" || storedTheme === "light"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";

    setThemeMode(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = themeMode;
    setStoredTheme(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const shouldReduceMotion =
      prefersReducedMotion || mediaMatches("(prefers-reduced-motion: reduce)");
    const root = pageRef.current;

    if (!root) {
      return;
    }

    const revealElements = Array.from(
      root.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (shouldReduceMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.12 },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const shouldReduceMotion =
      prefersReducedMotion || mediaMatches("(prefers-reduced-motion: reduce)");
    const pointerIsFine = mediaMatches("(pointer: fine)");

    if (shouldReduceMotion || !pointerIsFine) {
      return;
    }

    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    if (!cursor || !cursorDot) {
      return;
    }

    document.body.classList.add("has-hermes-cursor");

    const moveCursor = (event: PointerEvent) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.32,
        ease: "power3.out",
      });
      gsap.set(cursorDot, { x: clientX, y: clientY });
    };

    const toggleInteractiveCursor = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      cursor.classList.toggle(
        "is-active",
        Boolean(target.closest("a, button, iframe, [role='button']")),
      );
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerover", toggleInteractiveCursor);
    window.addEventListener("pointerout", toggleInteractiveCursor);

    return () => {
      document.body.classList.remove("has-hermes-cursor");
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", toggleInteractiveCursor);
      window.removeEventListener("pointerout", toggleInteractiveCursor);
    };
  }, [prefersReducedMotion]);

  useGSAP(
    () => {
      const shouldReduceMotion =
        prefersReducedMotion ||
        (typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches);

      if (shouldReduceMotion) {
        gsap.set(entryOverlayRef.current, { autoAlpha: 0, display: "none" });
        gsap.set(
          [
            headerRef.current,
            heroCopyRef.current,
            subheadlineRef.current,
            ctasRef.current,
            mockupRef.current,
            mockupEntryRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 },
        );
        mockupEntryRef.current?.classList.remove("opacity-0");
        return;
      }

      const navElements = headerRef.current?.querySelectorAll("[data-nav-item]");
      let wingTween: gsap.core.Tween | null = null;

      const startWingFlap = () => {
        if (!wingRef.current) {
          return;
        }

        wingTween = gsap.to(wingRef.current, {
          rotation: -8,
          yoyo: true,
          repeat: -1,
          duration: 0.2,
          ease: "sine.inOut",
          transformOrigin: "28% 70%",
        });
      };

      gsap.set(entryOverlayRef.current, { autoAlpha: 1, display: "grid" });
      gsap.set(entryLogoRef.current, {
        scale: 0.78,
        y: 34,
        opacity: 0,
        transformOrigin: "50% 50%",
      });
      gsap.set(entryLineRef.current, { scaleX: 0, transformOrigin: "50% 50%" });
      gsap.set(headerRef.current, { opacity: 0, y: -18 });
      gsap.set(navElements ?? [], { opacity: 0, y: -8 });
      gsap.set(heroCopyRef.current, { opacity: 0, y: 34 });
      gsap.set(subheadlineRef.current, { opacity: 0, y: 24 });
      gsap.set(ctasRef.current, { opacity: 0, y: 18 });
      gsap.set(mockupRef.current, {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        force3D: true,
      });
      gsap.set(mockupEntryRef.current, {
        autoAlpha: 0,
        x: 0,
        y: 18,
        rotation: 0,
        scale: 1,
        force3D: true,
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        onStart: startWingFlap,
        onComplete: () => {
          const visibleHeroElements = [
            headerRef.current,
            heroCopyRef.current,
            subheadlineRef.current,
            ctasRef.current,
            mockupRef.current,
          ].filter(Boolean);

          mockupEntryRef.current?.classList.remove("opacity-0");
          wingTween?.kill();
          if (wingRef.current) {
            gsap.set(wingRef.current, { rotation: 0 });
          }
          gsap.set(visibleHeroElements, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
          });
          gsap.set(mockupEntryRef.current, {
            clearProps: "opacity,visibility,transform",
          });
          gsap.set(entryOverlayRef.current, { display: "none" });
          ScrollTrigger.refresh();
        },
      });

      timeline
        .to(entryLogoRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.76,
        })
        .to(
          entryLineRef.current,
          {
            scaleX: 1,
            duration: 0.58,
            ease: "power2.inOut",
          },
          "-=0.28",
        )
        .to(entryLogoRef.current, {
          scale: 0.34,
          y: -120,
          duration: 0.72,
          ease: "power3.inOut",
        })
        .to(
          entryOverlayRef.current,
          {
            autoAlpha: 0,
            duration: 0.54,
            ease: "power2.inOut",
          },
          "-=0.34",
        )
        .to(
          headerRef.current,
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.22",
        )
        .to(
          navElements ?? [],
          { opacity: 1, y: 0, stagger: 0.04, duration: 0.28 },
          "-=0.34",
        )
        .to(
          mockupEntryRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.56,
            ease: "power2.out",
            force3D: true,
          },
          "-=0.38",
        )
        .to(
          heroCopyRef.current,
          { opacity: 1, y: 0, duration: 0.48 },
          "-=0.5",
        )
        .to(
          subheadlineRef.current,
          { opacity: 1, y: 0, duration: 0.36 },
          "-=0.3",
        )
        .to(
          ctasRef.current,
          { opacity: 1, y: 0, duration: 0.34 },
          "-=0.22",
        );

      return () => {
        wingTween?.kill();
        timeline.kill();
      };
    },
    { scope: heroRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const shouldReduceMotion =
        prefersReducedMotion ||
        (typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      const hero = heroRef.current;
      const about = aboutRef.current;
      const mockup = mockupRef.current;

      if (shouldReduceMotion || !hero || !about || !mockup) {
        return;
      }

      const browserMask = mockup.querySelector<HTMLElement>(".hero-browser-mask");
      const browserChrome = mockup.querySelector<HTMLElement>(".hero-browser-chrome");
      const browserBody = mockup.querySelector<HTMLElement>(".hero-browser-body");
      const browserStage = mockup.querySelector<HTMLElement>(".hero-browser-stage");
      const browserViewport =
        mockup.querySelector<HTMLElement>(".hero-browser-viewport");
      const browserDepth = mockup.querySelector<HTMLElement>(".hero-browser-depth");
      const continuityLabel =
        mockup.querySelector<HTMLElement>(".hero-browser-continuity");
      const browserGlow = mockup.querySelector<HTMLElement>(".hero-browser-glow");
      const browserArc = mockup.querySelector<HTMLElement>(".hero-browser-arc");
      const browserPreviewGrid = mockup.querySelector<HTMLElement>(
        ".hero-browser-preview-grid",
      );
      const browserLeft = mockup.querySelector<HTMLElement>(".hero-browser-left");
      const browserRight = mockup.querySelector<HTMLElement>(".hero-browser-right");
      const browserFootnote =
        mockup.querySelector<HTMLElement>(".hero-browser-footnote");
      const aboutContent = about.querySelector<HTMLElement>(
        ".about-mask-reveal__content",
      );
      const heroDecor = hero.querySelectorAll<HTMLElement>("[data-hero-decor]");

      if (
        !browserMask ||
        !browserChrome ||
        !browserBody ||
        !browserStage ||
        !browserViewport ||
        !browserGlow ||
        !browserArc ||
        !browserPreviewGrid ||
        !browserLeft ||
        !browserRight ||
        !browserFootnote ||
        !aboutContent
      ) {
        return;
      }

      const heroTextElements = [
        headerRef.current,
        heroCopyRef.current,
        subheadlineRef.current,
        ctasRef.current,
      ].filter(Boolean);
      const browserGlassLayers = [
        browserGlow,
        browserArc,
        browserPreviewGrid,
        browserLeft,
        browserRight,
        browserFootnote,
      ];

      gsap.set([browserLeft, browserRight, browserFootnote], {
        autoAlpha: 1,
        xPercent: 0,
      });
      gsap.set(hero, { "--hero-paper-opacity": 1 });
      gsap.set(about, { autoAlpha: 0 });
      gsap.set(aboutContent, { y: 10 });
      gsap.set(heroDecor, { autoAlpha: 1 });
      gsap.set([browserMask, browserBody, browserStage, browserViewport], {
        autoAlpha: 1,
      });

      const getPortalTransform = () => {
        const rect = mockup.getBoundingClientRect();
        const viewportWidth = Math.max(window.innerWidth, 1);
        const viewportHeight = Math.max(window.innerHeight, 1);
        const scaleToCover =
          Math.max(
            viewportWidth / Math.max(rect.width, 1),
            viewportHeight / Math.max(rect.height, 1),
          ) * 1.18;

        return {
          x: viewportWidth / 2 - (rect.left + rect.width / 2),
          y: viewportHeight / 2 - (rect.top + rect.height / 2),
          scale: Math.min(Math.max(scaleToCover, 1.85), 4.8),
        };
      };

      const getRevealDistance = () => Math.max(window.innerHeight, 1);

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: () => `+=${getRevealDistance()}`,
          scrub: 0.55,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => about.classList.add("is-about-locked"),
          onEnterBack: () => about.classList.add("is-about-locked"),
          onLeave: () => about.classList.remove("is-about-locked"),
          onLeaveBack: () => about.classList.remove("is-about-locked"),
          toggleClass: {
            targets: hero,
            className: "is-hero-mask-active",
          },
        },
      });

      timeline
        .fromTo(
          heroTextElements,
          { autoAlpha: 1, y: 0 },
          {
            autoAlpha: 0,
            y: -48,
            stagger: 0.018,
            duration: 0.2,
            ease: "power2.out",
            immediateRender: false,
          },
          0,
        )
        .to(
          browserLeft,
          {
            autoAlpha: 0,
            xPercent: -72,
            duration: 0.28,
            ease: "power2.in",
          },
          0.06,
        )
        .to(
          browserRight,
          {
            autoAlpha: 0,
            xPercent: 72,
            duration: 0.28,
            ease: "power2.in",
          },
          0.06,
        )
        .to(
          browserFootnote,
          {
            autoAlpha: 0,
            y: 22,
            duration: 0.22,
            ease: "power2.out",
          },
          0.06,
        )
        .to(
          mockup,
          {
            x: () => getPortalTransform().x,
            y: () => getPortalTransform().y,
            scale: () => getPortalTransform().scale,
            duration: 0.56,
            ease: "power2.inOut",
          },
          0.02,
        )
        .to(
          hero,
          {
            "--hero-paper-opacity": 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.18,
        )
        .to(
          about,
          {
            autoAlpha: 1,
            duration: 0.28,
            ease: "power2.out",
          },
          0.18,
        )
        .to(
          aboutContent,
          {
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          0.18,
        )
        .to(
          heroDecor,
          {
            autoAlpha: 0,
            duration: 0.22,
            ease: "power2.out",
          },
          0.14,
        )
        .to(
          browserMask,
          {
            backgroundColor: "rgba(231, 227, 216, 0)",
            borderColor: "rgba(201, 169, 110, 0.18)",
            boxShadow: "0 32px 90px rgba(26, 29, 38, 0.08)",
            duration: 0.26,
            ease: "power2.inOut",
          },
          0.16,
        )
        .to(
          [browserStage, browserViewport],
          {
            backgroundColor: "rgba(231, 227, 216, 0)",
            borderColor: "rgba(201, 169, 110, 0.14)",
            duration: 0.26,
            ease: "power2.inOut",
          },
          0.16,
        )
        .to(
          browserGlassLayers,
          {
            autoAlpha: 0,
            duration: 0.2,
            ease: "power2.out",
          },
          0.16,
        )
        .to(
          browserChrome,
          {
            autoAlpha: 0,
            yPercent: -110,
            duration: 0.18,
            ease: "power2.out",
          },
          0.08,
        )
        .to(
          continuityLabel,
          {
            autoAlpha: 0,
            y: 12,
            duration: 0.16,
            ease: "power2.out",
          },
          0.08,
        )
        .to(
          browserMask,
          {
            borderRadius: 0,
            duration: 0.44,
            ease: "power2.inOut",
          },
          0.12,
        )
        .to(
          [browserBody, browserStage],
          {
            padding: 0,
            duration: 0.38,
            ease: "power2.inOut",
          },
          0.16,
        )
        .to(
          [browserStage, browserViewport],
          {
            borderRadius: 0,
            duration: 0.38,
            ease: "power2.inOut",
          },
          0.16,
        )
        .to(
          browserDepth,
          {
            autoAlpha: 0.16,
            duration: 0.2,
            ease: "power2.inOut",
          },
          0.18,
        )
        .to(
          [mockup, browserMask, browserBody, browserStage, browserViewport],
          {
            autoAlpha: 0,
            duration: 0.16,
            ease: "power2.out",
          },
          0.44,
        );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set(hero, { "--hero-paper-opacity": 1 });
        gsap.set(about, { clearProps: "opacity,visibility" });
        gsap.set(aboutContent, { clearProps: "transform" });
        hero.classList.remove("is-hero-mask-active");
        about.classList.remove("is-about-locked");
      };
    },
    { scope: heroRef, dependencies: [prefersReducedMotion], revertOnUpdate: true },
  );

  const toggleTheme = () => {
    setThemeMode((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <div ref={pageRef} className="relative bg-[var(--mineral)] text-[var(--charcoal)]">
      <div ref={cursorRef} className="hermes-cursor" aria-hidden="true" />
      <div ref={cursorDotRef} className="hermes-cursor-dot" aria-hidden="true" />

      <HeroSection
        themeMode={themeMode}
        heroRef={heroRef}
        headerRef={headerRef}
        wingRef={wingRef}
        entryOverlayRef={entryOverlayRef}
        entryLogoRef={entryLogoRef}
        entryLineRef={entryLineRef}
        heroCopyRef={heroCopyRef}
        subheadlineRef={subheadlineRef}
        ctasRef={ctasRef}
        mockupRef={mockupRef}
        mockupEntryRef={mockupEntryRef}
        onThemeToggle={toggleTheme}
        onSectionLinkClick={scrollToSection}
      />
      <AboutSection sectionRef={aboutRef} />
      <HowItWorksSection />
      <TemplateShowcase
        sectionRef={templatesRef}
        prefersReducedMotion={prefersReducedMotion}
      />
      <FAQSection />
      <ContactSection onSectionLinkClick={scrollToSection} />
    </div>
  );
}
