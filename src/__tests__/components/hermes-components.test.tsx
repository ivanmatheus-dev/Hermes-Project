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

    expect(screen.getByText("Presença digital que vende")).toBeInTheDocument();
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
  });

  it("renders a reusable templates carousel section with a live iframe thumbnail", () => {
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

  it("scrolls smoothly to the templates carousel from the primary CTA", () => {
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
    expect(hero?.querySelector(".hero-browser-mask")).toBeInTheDocument();
    expect(hero?.querySelector(".hero-browser-viewport")).toBeInTheDocument();
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
