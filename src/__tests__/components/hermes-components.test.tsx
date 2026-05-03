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
  it("renders a premium browser frame with mock navigation and CTA", () => {
    render(<BrowserMockup />);

    expect(screen.getByLabelText("Preview de site Hermes")).toBeInTheDocument();
    expect(screen.getByText("Estrutura")).toBeInTheDocument();
    expect(screen.getByText("Ver projetos")).toBeInTheDocument();
  });
});

describe("HermesScrollHero", () => {
  it("renders the editorial cover and final landing content", () => {
    render(<HermesScrollHero />);

    expect(screen.getAllByText("Hermes").length).toBeGreaterThan(0);
    expect(screen.getByText("Sites prontos para vender")).toBeInTheDocument();
    expect(screen.getByText("Templates")).toBeInTheDocument();
    expect(screen.getByText("Como funciona")).toBeInTheDocument();
    expect(screen.getByText(/Ver templates dispon/i)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Sites prontos para vender, com acabamento sob medida/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders a reusable templates carousel section with a live iframe thumbnail", () => {
    render(<HermesScrollHero />);

    const templatesSection = document.querySelector("#templates");

    expect(templatesSection).toBeInTheDocument();
    expect(
      within(templatesSection as HTMLElement).getByText(/Templates dispon/i),
    ).toBeInTheDocument();
    expect(
      within(templatesSection as HTMLElement).getByText(/Sorriso Integral/i),
    ).toBeInTheDocument();
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

    fireEvent.click(screen.getByText(/Ver templates dispon/i));

    expect(scrollIntoView).toHaveBeenCalledWith({
      behavior: "smooth",
      block: "start",
    });
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
