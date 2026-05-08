import { readFileSync } from "node:fs";

import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { AnimatedHermesLogo } from "@/components/brand/AnimatedHermesLogo";
import { HermesScrollHero } from "@/components/sections/HermesScrollHero";
import { BrowserMockup } from "@/components/ui/BrowserMockup";

vi.mock("@gsap/react", () => ({
  useGSAP: () => undefined,
}));

vi.mock("gsap", () => ({
  default: {
    registerPlugin: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      add: vi.fn().mockReturnThis(),
    })),
    to: vi.fn(),
  },
}));

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {},
}));

describe("AnimatedHermesLogo", () => {
  it("renders manipulable SVG groups for the boot, wing, and speed lines", () => {
    const { container } = render(<AnimatedHermesLogo />);

    expect(screen.getByTitle("Hermes")).toBeInTheDocument();
    expect(container.querySelector("g.boot")).toBeInTheDocument();
    expect(container.querySelector("g.wing")).toBeInTheDocument();
    expect(container.querySelector("g.speed-lines")).toBeInTheDocument();
  });
});

describe("BrowserMockup", () => {
  it("renders a premium browser frame with a preview of the next section", () => {
    render(<BrowserMockup />);

    expect(
      screen.getByLabelText("Preview da próxima seção Hermes"),
    ).toBeInTheDocument();
    expect(screen.getByText("hermes.design/templates")).toBeInTheDocument();
    expect(
      screen.getByText(/Presença digital com aparência de marca confiável/i),
    ).toBeInTheDocument();
  });
});

describe("HermesScrollHero", () => {
  it("renders the editorial cover and final landing content", () => {
    render(<HermesScrollHero />);

    expect(screen.getAllByText("Hermes").length).toBeGreaterThan(0);
    expect(screen.getByText("Sites prontos para vender")).toBeInTheDocument();
    expect(screen.getAllByText("Projetos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Como funciona").length).toBeGreaterThan(0);
    expect(screen.getByText(/Ver projetos dispon/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Sites prontos para vender, com acabamento sob medida/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the new service sections with workflow, FAQ, and final CTA", () => {
    render(<HermesScrollHero />);

    expect(screen.getAllByText("Presença digital que vende").length).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", {
        name: /A Hermes coloca sua empresa na internet/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Escolha guiada")).toBeInTheDocument();
    expect(screen.getByText(/Um ritmo claro para publicar/i)).toBeInTheDocument();
    expect(screen.getByText("Perguntas antes de começar.")).toBeInTheDocument();
    expect(screen.getByText(/Seu site pode parecer pronto para vender/i)).toBeInTheDocument();
  });

  it("toggles the document theme between light and dark mode", () => {
    render(<HermesScrollHero />);

    const themeToggle = screen.getByRole("button", { name: /ativar modo escuro/i });

    fireEvent.click(themeToggle);

    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(themeToggle).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: /ativar modo claro/i }));

    expect(document.documentElement).toHaveAttribute("data-theme", "light");
    expect(screen.getByRole("button", { name: /ativar modo escuro/i })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("renders the featured template preview without the secondary carousel", () => {
    render(<HermesScrollHero />);

    const templatesSection = document.querySelector("#templates");

    expect(templatesSection).toBeInTheDocument();
    expect(
      within(templatesSection as HTMLElement).getByText(/Projetos em destaque/i),
    ).toBeInTheDocument();
    expect(
      within(templatesSection as HTMLElement).getAllByText(/Sorriso Integral/i).length,
    ).toBeGreaterThan(0);
    expect(
      within(templatesSection as HTMLElement).queryByLabelText(
        /carrossel de templates dispon/i,
      ),
    ).not.toBeInTheDocument();
    expect(
      within(templatesSection as HTMLElement).queryByText(
        /linha vertical desenhada pelo scroll/i,
      ),
    ).not.toBeInTheDocument();
    expect(
      within(templatesSection as HTMLElement).getByRole("button", {
        name: /abrir template .*sorriso integral/i,
      }),
    ).toBeInTheDocument();
    expect(
      within(templatesSection as HTMLElement).getByTitle(
        /miniatura do template .*sorriso integral/i,
      ),
    ).toHaveAttribute("src", "/templates/template 3/dist/index.html");
  });

  it("keeps about and workflow cards theme-neutral until hover", () => {
    render(<HermesScrollHero />);

    const aboutSection = document.querySelector("#sobre") as HTMLElement;
    const workflowSection = document.querySelector("#como-funciona") as HTMLElement;
    const clientesCard = within(aboutSection)
      .getByText("Clientes")
      .closest("article") as HTMLElement;
    const publicacaoCard = within(workflowSection)
      .getByText("Publicação guiada")
      .closest("article") as HTMLElement;
    const clientesText = within(clientesCard).getByText(/caminhos claros para contato/i);
    const publicacaoText = within(publicacaoCard).getByText(/Entregamos o site revisado/i);
    const clientesClasses = clientesCard.className.split(" ");
    const publicacaoClasses = publicacaoCard.className.split(" ");

    expect(clientesCard.className).toContain("bg-[var(--bone)]");
    expect(clientesClasses).not.toContain("bg-[var(--charcoal)]");
    expect(clientesCard.className).toContain("hover:bg-[var(--charcoal)]");
    expect(clientesText.className).toContain("text-[var(--charcoal)]");
    expect(clientesText.className).toContain("group-hover:text-[var(--bone)]");

    expect(publicacaoCard.className).toContain("bg-[var(--bone)]");
    expect(publicacaoClasses).not.toContain("bg-[var(--charcoal)]");
    expect(publicacaoCard.className).toContain("hover:bg-[var(--charcoal)]");
    expect(publicacaoText.className).toContain("text-[var(--charcoal)]");
    expect(publicacaoText.className).toContain("group-hover:text-[var(--bone)]");
  });

  it("keeps the final contact panel compact enough to occupy one viewport", () => {
    render(<HermesScrollHero />);

    const contactSection = document.querySelector("#contato") as HTMLElement;
    const contactHeading = within(contactSection).getByRole("heading", {
      name: /Seu site pode parecer pronto para vender/i,
    });

    expect(contactSection.className).toContain("min-h-screen");
    expect(contactSection.className).toContain("items-center");
    expect(contactSection.className).toContain("py-14");
    expect(contactHeading.className).toContain("5rem");
    expect(contactHeading.className).not.toContain("6.8rem");
  });

  it("defines explicit hero text start values so scroll reversal restores the copy", () => {
    const heroSource = readFileSync(
      "src/components/sections/HermesScrollHero.tsx",
      "utf8",
    );

    expect(heroSource).toContain(".fromTo(");
    expect(heroSource).toContain("{ autoAlpha: 1, y: 0 }");
    expect(heroSource).toContain("immediateRender: false");
    expect(heroSource).toContain("visibleHeroElements");
  });

  it("keeps the initial mockup entry light enough to avoid first-load jank", () => {
    const heroSource = readFileSync(
      "src/components/sections/HermesScrollHero.tsx",
      "utf8",
    );
    const heroSectionSource = readFileSync(
      "src/components/sections/HeroSection.tsx",
      "utf8",
    );
    const stylesSource = readFileSync("src/styles/globals.css", "utf8");

    expect(heroSectionSource).toContain("mockupEntryRef");
    expect(heroSectionSource).toContain("hero-mockup-entry opacity-0");
    expect(heroSource).toContain("gsap.set(mockupRef.current");
    expect(heroSource).toContain("autoAlpha: 1");
    expect(heroSource).toContain("gsap.set(mockupEntryRef.current");
    expect(heroSource).toContain("autoAlpha: 0");
    expect(heroSource).toContain("y: 18");
    expect(heroSource).toContain("scale: 1");
    expect(heroSource).not.toContain("scale: 0.985");
    expect(heroSource).not.toContain("x: 120");
    expect(heroSource).not.toContain("rotation: 4");
    expect(heroSource).toContain(".to(\n          mockupEntryRef.current");
    expect(heroSource).toContain('clearProps: "opacity,visibility,transform"');
    expect(heroSource).toContain("const mockup = mockupRef.current");
    expect(heroSource).toContain(".to(\n          mockup,");
    expect(heroSource).toContain('ease: "power2.out"');
    expect(stylesSource).toContain(".hero-mockup-entry");
    expect(stylesSource).toContain("will-change: transform, opacity;");
    expect(stylesSource).toContain("backface-visibility: hidden;");
  });

  it("scrolls smoothly to the templates section from the primary CTA", () => {
    const scrollIntoView = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoView;

    render(<HermesScrollHero />);

    fireEvent.click(screen.getByText(/Ver projetos dispon/i));

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
  });

  it("renders the hero as a scroll-triggered browser mask stage", () => {
    render(<HermesScrollHero />);

    const hero = document.querySelector<HTMLElement>(".hero-scroll-stage");

    expect(hero).toBeInTheDocument();
    expect(hero?.querySelector(".hero-mockup-shell")).toBeInTheDocument();
    expect(hero?.querySelector(".hero-mockup-entry")).toBeInTheDocument();
    expect(hero?.querySelector(".hero-browser-mask")).toBeInTheDocument();
    expect(hero?.querySelector(".hero-browser-viewport")).toBeInTheDocument();
    expect(hero?.querySelector(".hero-browser-left")).toBeInTheDocument();
    expect(hero?.querySelector(".hero-browser-right")).toBeInTheDocument();
    expect(hero?.querySelector(".hero-browser-next")).not.toBeInTheDocument();
  });

  it("uses the real about section behind the hero mask instead of duplicating it", () => {
    const heroSource = readFileSync(
      "src/components/sections/HermesScrollHero.tsx",
      "utf8",
    );
    const mainAboutSource = readFileSync(
      "src/components/sections/AboutSection.tsx",
      "utf8",
    );
    const templateAboutSource = readFileSync(
      "public/templates/template 3/src/components/sections/AboutSection.jsx",
      "utf8",
    );

    render(<HermesScrollHero />);

    const hero = document.querySelector<HTMLElement>(".hero-scroll-stage");
    const aboutSection = document.querySelector("#sobre") as HTMLElement;
    const workflowSection = document.querySelector("#como-funciona") as HTMLElement;
    const stylesSource = readFileSync("src/styles/globals.css", "utf8");
    const aboutLockStyles =
      stylesSource.match(/\.about-mask-reveal\.is-about-locked\s*{[^}]+}/)?.[0] ??
      "";

    expect(hero?.querySelector(".hero-browser-next")).not.toBeInTheDocument();
    expect(aboutSection).toBeInTheDocument();
    expect(workflowSection).toBeInTheDocument();
    expect(
      aboutSection.compareDocumentPosition(workflowSection) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(aboutSection.className).toContain("about-mask-reveal");
    expect(aboutSection.querySelector(".about-mask-reveal__content")).toBeInTheDocument();
    expect(mainAboutSource).toContain('id="sobre"');
    expect(mainAboutSource).toContain("about-mask-reveal");
    expect(templateAboutSource).toContain('id="escuta"');
    expect(heroSource).not.toContain("public/templates/template 3");
    expect(heroSource).not.toContain('id="escuta"');
    expect(heroSource).toContain("getRevealDistance");
    expect(heroSource).toContain("Math.max(window.innerHeight, 1)");
    expect(heroSource).not.toContain("window.innerHeight * 0.78");
    expect(heroSource).toContain("scrub: 0.55");
    expect(heroSource).toContain("pinSpacing: false");
    expect(heroSource).toContain('classList.add("is-about-locked")');
    expect(heroSource).toContain('classList.remove("is-about-locked")');
    expect(heroSource).toContain("const about = aboutRef.current");
    expect(heroSource).toContain("gsap.set(about, { autoAlpha: 0 })");
    expect(heroSource).not.toContain("gsap.set(about, { autoAlpha: 0, y:");
    expect(heroSource).toContain("gsap.set(aboutContent, { y: 14 })");
    expect(heroSource).not.toContain('filter: "blur(8px)"');
    expect(heroSource).not.toContain('filter: "blur(0px)"');
    expect(heroSource).toContain("xPercent: -72");
    expect(heroSource).toContain("xPercent: 72");
    expect(heroSource).toContain("duration: 0.64");
    expect(heroSource).toContain("0.5");
    expect(heroSource).toContain("0.78");
    expect(heroSource).toContain('"--hero-paper-opacity": 0');
    expect(stylesSource).toContain(".about-mask-reveal {\n  margin-top: 0;");
    expect(stylesSource).toContain(".about-mask-reveal.is-about-locked");
    expect(aboutLockStyles).toContain("position: sticky;");
    expect(aboutLockStyles).toContain("top: 0;");
    expect(aboutLockStyles).toContain("min-height: 100vh;");
    expect(aboutLockStyles).not.toContain("position: fixed;");
    expect(stylesSource).not.toContain("will-change: transform, opacity, filter;");
    expect(stylesSource).not.toContain("margin-top: -100vh");
  });

  it("opens the selected template in an iframe modal and closes it with the X button", () => {
    render(<HermesScrollHero />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /abrir template .*sorriso integral/i,
      }),
    );

    const dialog = screen.getByRole("dialog", {
      name: /preview do template .*sorriso integral/i,
    });

    expect(dialog).toBeInTheDocument();
    expect(screen.getByTitle(/Preview do template .*Sorriso Integral/i)).toHaveAttribute(
      "src",
      "/templates/template 3/dist/index.html",
    );

    fireEvent.click(screen.getByRole("button", { name: /fechar preview/i }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes the template modal with Escape", () => {
    render(<HermesScrollHero />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /abrir template .*sorriso integral/i,
      }),
    );

    fireEvent.keyDown(window, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("Template static bundle", () => {
  it("uses nested relative asset URLs so iframe previews do not request /assets from the app root", () => {
    const templateBundle = readFileSync(
      "public/templates/template 3/dist/assets/index-CfQ9vHRC.js",
      "utf8",
    );

    expect(templateBundle).not.toContain('"/assets/');
    expect(templateBundle).not.toContain("'/assets/");
    expect(templateBundle).toContain('"./assets/');
  });
});
