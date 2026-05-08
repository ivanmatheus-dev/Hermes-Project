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
import { ScrollRibbon } from "@/components/sections/ScrollRibbon";
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
  const templatesRef = useRef<HTMLElement | null>(null);
  const scrollRibbonStageRef = useRef<HTMLDivElement | null>(null);
  const scrollRibbonPathRef = useRef<SVGPathElement | null>(null);
  const templateFrameRef = useRef<HTMLDivElement | null>(null);
  const templateWaveRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLElement | null>(null);
  const wingRef = useRef<SVGGElement | null>(null);
  const entryOverlayRef = useRef<HTMLDivElement | null>(null);
  const entryLogoRef = useRef<HTMLDivElement | null>(null);
  const entryLineRef = useRef<HTMLSpanElement | null>(null);
  const heroCopyRef = useRef<HTMLDivElement | null>(null);
  const subheadlineRef = useRef<HTMLParagraphElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const mockupRef = useRef<HTMLDivElement | null>(null);
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
          ],
          { opacity: 1, y: 0, x: 0, scale: 1, rotation: 0 },
        );
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
        opacity: 0,
        x: 120,
        y: 22,
        rotation: 4,
        scale: 0.96,
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

          wingTween?.kill();
          if (wingRef.current) {
            gsap.set(wingRef.current, { rotation: 0 });
          }
          gsap.set(visibleHeroElements, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            rotation: 0,
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
          { opacity: 1, y: 0, duration: 0.46 },
          "-=0.18",
        )
        .to(
          navElements ?? [],
          { opacity: 1, y: 0, stagger: 0.045, duration: 0.32 },
          "-=0.28",
        )
        .to(
          mockupRef.current,
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.72,
          },
          "-=0.32",
        )
        .to(
          heroCopyRef.current,
          { opacity: 1, y: 0, duration: 0.52 },
          "-=0.58",
        )
        .to(
          subheadlineRef.current,
          { opacity: 1, y: 0, duration: 0.42 },
          "-=0.34",
        )
        .to(
          ctasRef.current,
          { opacity: 1, y: 0, duration: 0.38 },
          "-=0.24",
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
      const mockup = mockupRef.current;

      if (shouldReduceMotion || !hero || !mockup) {
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
      const browserLeft = mockup.querySelector<HTMLElement>(".hero-browser-left");
      const browserRight = mockup.querySelector<HTMLElement>(".hero-browser-right");
      const browserFootnote =
        mockup.querySelector<HTMLElement>(".hero-browser-footnote");
      const heroDecor = hero.querySelectorAll<HTMLElement>("[data-hero-decor]");

      if (
        !browserMask ||
        !browserChrome ||
        !browserBody ||
        !browserStage ||
        !browserViewport ||
        !browserLeft ||
        !browserRight ||
        !browserFootnote
      ) {
        return;
      }

      const heroTextElements = [
        headerRef.current,
        heroCopyRef.current,
        subheadlineRef.current,
        ctasRef.current,
      ].filter(Boolean);

      gsap.set([browserLeft, browserRight, browserFootnote], {
        autoAlpha: 1,
        xPercent: 0,
        filter: "blur(0px)",
      });
      gsap.set(hero, { "--hero-paper-opacity": 1 });
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
          scrub: 0.9,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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
            xPercent: -78,
            filter: "blur(8px)",
            duration: 0.34,
            ease: "power2.in",
          },
          0.08,
        )
        .to(
          browserRight,
          {
            autoAlpha: 0,
            xPercent: 78,
            filter: "blur(8px)",
            duration: 0.34,
            ease: "power2.in",
          },
          0.08,
        )
        .to(
          browserFootnote,
          {
            autoAlpha: 0,
            y: 22,
            duration: 0.22,
            ease: "power2.out",
          },
          0.08,
        )
        .to(
          mockup,
          {
            x: () => getPortalTransform().x,
            y: () => getPortalTransform().y,
            scale: () => getPortalTransform().scale,
            duration: 0.82,
            ease: "power2.inOut",
          },
          0,
        )
        .to(
          hero,
          {
            "--hero-paper-opacity": 0,
            duration: 0.38,
            ease: "power2.inOut",
          },
          0.24,
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
            autoAlpha: 0.28,
            duration: 0.32,
            ease: "power2.inOut",
          },
          0.24,
        )
        .to(
          [browserMask, browserBody, browserStage, browserViewport],
          {
            autoAlpha: 0,
            duration: 0.28,
            ease: "power2.out",
          },
          0.56,
        );

      return () => {
        timeline.scrollTrigger?.kill();
        timeline.kill();
        gsap.set(hero, { "--hero-paper-opacity": 1 });
        hero.classList.remove("is-hero-mask-active");
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
      const stage = scrollRibbonStageRef.current;
      const ribbonPath = scrollRibbonPathRef.current;
      const templateFrame = templateFrameRef.current;
      const templateWave = templateWaveRef.current;

      if (!stage || !ribbonPath) {
        return;
      }

      const pathLength = ribbonPath.getTotalLength();
      const workflowCards = Array.from(
        stage.querySelectorAll<HTMLElement>(".workflow-paintable-card"),
      );
      const workflowPaintFills = Array.from(
        stage.querySelectorAll<HTMLElement>(".workflow-paint-fill"),
      );
      const templatePaintFill = stage.querySelector<HTMLElement>(
        ".template-preview-paint-fill",
      );
      const paintFills = [...workflowPaintFills, templatePaintFill].filter(
        (element): element is HTMLElement => Boolean(element),
      );
      const paintableElements = [...workflowCards, templateFrame].filter(
        (element): element is HTMLElement => Boolean(element),
      );

      gsap.set(ribbonPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: shouldReduceMotion ? 0 : pathLength,
      });

      gsap.set(paintFills, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      if (templateFrame) {
        gsap.set(templateFrame, {
          borderColor: shouldReduceMotion ? "var(--ribbon-orange)" : "var(--border)",
          boxShadow: shouldReduceMotion
            ? "0 30px 78px rgba(200, 117, 0, 0.18)"
            : "0 24px 70px rgba(26,29,38,0.08)",
        });
      }

      if (templateWave) {
        gsap.set(templateWave, {
          autoAlpha: shouldReduceMotion ? 1 : 0,
          clipPath: shouldReduceMotion
            ? "circle(150% at 88% 74%)"
            : "circle(0% at 88% 74%)",
        });
      }

      if (shouldReduceMotion) {
        workflowCards.forEach((card) => card.classList.remove("is-painted"));
        if (templatePaintFill) {
          gsap.set(templatePaintFill, { scaleX: 1 });
        }
        templateFrame?.classList.add("is-painted");
        return;
      }

      paintableElements.forEach((element) => element.classList.remove("is-painted"));

      const ribbonCardsDrawnProgress = 0.8;
      const ribbonCardsCatchUpDuration = 0.44;
      const ribbonCardCatchUpOffset =
        pathLength * (1 - ribbonCardsDrawnProgress);
      const ribbonTemplateTouchProgress = 0.96;
      const ribbonTemplateTouchDuration = 0.18;
      const ribbonTemplateTouchOffset =
        pathLength * (1 - ribbonTemplateTouchProgress);
      const templatePaintTiming = 0.82;
      const workflowPaintInDuration = 0.08;
      const workflowPaintHoldDuration = 0.04;
      const workflowPaintOutDuration = 0.12;
      const templatePaintDuration = 0.18;
      const workflowPaintTriggers = workflowPaintFills.map((paintFill, index) => {
        const card = workflowCards[index];

        return gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 75%",
            end: "center 52%",
            scrub: 0.35,
            invalidateOnRefresh: true,
          },
          onStart: () => card?.classList.add("is-painted"),
          onReverseStart: () => card?.classList.add("is-painted"),
          onComplete: () => card?.classList.remove("is-painted"),
          onReverseComplete: () => card?.classList.remove("is-painted"),
        })
          .to(paintFill, {
            scaleX: 1,
            duration: workflowPaintInDuration,
            ease: "power2.out",
          })
          .to(paintFill, {
            scaleX: 1,
            duration: workflowPaintHoldDuration,
            ease: "none",
          })
          .to(paintFill, {
            scaleX: 0,
            duration: workflowPaintOutDuration,
            ease: "power2.inOut",
          });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          start: "top bottom",
          end: "bottom 62%",
          scrub: 0.58,
          invalidateOnRefresh: true,
        },
      });

      if (templatePaintFill) {
        timeline.to(
          templatePaintFill,
          {
            scaleX: 1,
            duration: templatePaintDuration,
            ease: "power2.out",
            onStart: () => templateFrame?.classList.add("is-painted"),
            onReverseComplete: () => templateFrame?.classList.remove("is-painted"),
          },
          templatePaintTiming,
        );
      }

      timeline
        .to(ribbonPath, {
          strokeDashoffset: ribbonCardCatchUpOffset,
          duration: ribbonCardsCatchUpDuration,
        })
        .to(ribbonPath, {
          strokeDashoffset: ribbonTemplateTouchOffset,
          duration: ribbonTemplateTouchDuration,
        })
        .addLabel("templateTouch");

      if (templateFrame) {
        timeline.to(
          templateFrame,
          {
            borderColor: "var(--ribbon-orange)",
            boxShadow: "0 30px 84px rgba(200, 117, 0, 0.2)",
            duration: 0.06,
          },
          "templateTouch",
        );
      }

      if (templateWave) {
        timeline.to(
          templateWave,
          {
            autoAlpha: 1,
            clipPath: "circle(150% at 88% 74%)",
            duration: 0.16,
            ease: "power2.out",
          },
          "templateTouch",
        );
      }

      timeline.to(ribbonPath, {
        strokeDashoffset: 0,
        duration: 1 - ribbonCardsCatchUpDuration - ribbonTemplateTouchDuration,
      });

      return () => {
        workflowPaintTriggers.forEach((triggerTimeline) => {
          triggerTimeline.scrollTrigger?.kill();
          triggerTimeline.kill();
        });
        timeline.scrollTrigger?.kill();
        timeline.kill();
        paintableElements.forEach((element) => element.classList.remove("is-painted"));
      };
    },
    {
      scope: scrollRibbonStageRef,
      dependencies: [prefersReducedMotion],
      revertOnUpdate: true,
    },
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
        onThemeToggle={toggleTheme}
        onSectionLinkClick={scrollToSection}
      />
      <AboutSection />
      <ScrollRibbon
        stageRef={scrollRibbonStageRef}
        pathRef={scrollRibbonPathRef}
      >
        <HowItWorksSection />
        <TemplateShowcase
          sectionRef={templatesRef}
          templateFrameRef={templateFrameRef}
          templateWaveRef={templateWaveRef}
          prefersReducedMotion={prefersReducedMotion}
        />
      </ScrollRibbon>
      <FAQSection />
      <ContactSection onSectionLinkClick={scrollToSection} />
    </div>
  );
}
