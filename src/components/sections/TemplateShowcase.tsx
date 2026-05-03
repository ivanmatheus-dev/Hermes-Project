"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type RefObject,
} from "react";

type TemplatePreview = {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  accent: string;
  status: "available" | "soon";
};

type TemplateModalStyle = CSSProperties & {
  "--origin-left"?: string;
  "--origin-top"?: string;
  "--origin-scale-x"?: string;
  "--origin-scale-y"?: string;
};

type TemplateShowcaseProps = {
  prefersReducedMotion: boolean;
  sectionRef: RefObject<HTMLElement | null>;
};

const templates: TemplatePreview[] = [
  {
    id: "clinica-sorriso-integral",
    title: "Clínica Sorriso Integral",
    category: "Saúde premium",
    description:
      "Landing page para clínicas que precisam transmitir autoridade, acolhimento e agendamento rápido.",
    href: "/templates/template 3/dist/index.html",
    accent: "rgba(201, 169, 110, 0.42)",
    status: "available",
  },
];

export function TemplateShowcase({
  prefersReducedMotion,
  sectionRef,
}: TemplateShowcaseProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplatePreview | null>(null);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!selectedTemplate) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedTemplate(null);
      }
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedTemplate]);

  const scrollCarousel = (direction: -1 | 1) => {
    carouselRef.current?.scrollBy({
      left: direction * 420,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const openTemplatePreview = (
    template: TemplatePreview,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (template.status !== "available") {
      return;
    }

    setOriginRect(event.currentTarget.getBoundingClientRect());
    setSelectedTemplate(template);
  };

  const closeTemplatePreview = () => {
    setSelectedTemplate(null);
  };

  const modalStyle: TemplateModalStyle =
    originRect && !prefersReducedMotion && typeof window !== "undefined"
      ? {
          "--origin-left": `${
            originRect.left + originRect.width / 2 - window.innerWidth / 2
          }px`,
          "--origin-top": `${
            originRect.top + originRect.height / 2 - window.innerHeight / 2
          }px`,
          "--origin-scale-x": `${Math.max(
            originRect.width / (window.innerWidth * 0.8),
            0.18,
          )}`,
          "--origin-scale-y": `${Math.max(
            originRect.height / (window.innerHeight * 0.8),
            0.18,
          )}`,
        }
      : {};

  return (
    <>
      <section
        id="templates"
        ref={sectionRef}
        className="mineral-paper relative overflow-hidden bg-[var(--mineral)] px-5 py-24 text-[var(--charcoal)] md:px-10 md:py-32 lg:px-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[8%] top-20 h-px w-[84%] bg-[rgba(26,29,38,0.12)]"
        />
        <div className="mx-auto max-w-[92rem]">
          <div className="mb-10 flex flex-col justify-between gap-8 md:mb-14 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs uppercase tracking-[0.32em] text-[var(--mist)]">
                Templates disponíveis
              </p>
              <h2 className="font-serif text-[clamp(2.5rem,5vw,5rem)] font-medium leading-[0.98] text-[var(--charcoal)]">
                Escolha o ponto de partida do seu próximo site.
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Ver template anterior"
                onClick={() => scrollCarousel(-1)}
                className="grid h-12 w-12 place-items-center border border-[var(--border)] text-2xl leading-none text-[var(--charcoal)] transition-[background,transform] duration-300 hover:-translate-x-1 hover:bg-[rgba(231,227,216,0.62)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
              >
                <span aria-hidden="true">{"<"}</span>
              </button>
              <button
                type="button"
                aria-label="Ver proximo template"
                onClick={() => scrollCarousel(1)}
                className="grid h-12 w-12 place-items-center border border-[var(--border)] bg-[var(--charcoal)] text-2xl leading-none text-[var(--bone)] transition-[background,transform] duration-300 hover:translate-x-1 hover:bg-[rgba(26,29,38,0.9)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
              >
                <span aria-hidden="true">{">"}</span>
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="templates-carousel flex snap-x gap-5 overflow-x-auto pb-6 md:gap-7"
            aria-label="Carrossel de templates disponíveis"
          >
            {templates.map((template) => (
              <article
                key={template.id}
                className="group relative min-h-[34rem] w-[82vw] shrink-0 snap-center overflow-hidden border border-[var(--border)] bg-[rgba(231,227,216,0.68)] text-left shadow-[0_24px_70px_rgba(26,29,38,0.08)] transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-2 hover:border-[rgba(201,169,110,0.62)] hover:shadow-[0_34px_90px_rgba(26,29,38,0.15)] sm:w-[28rem] lg:w-[34rem]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1"
                  style={{ background: template.accent }}
                />
                <span className="block p-5 md:p-6">
                  <span className="flex h-9 items-center justify-between border-b border-[var(--border)] pb-4">
                    <span className="flex gap-2" aria-hidden="true">
                      <span className="h-2 w-2 rounded-full bg-[rgba(26,29,38,0.18)]" />
                      <span className="h-2 w-2 rounded-full bg-[rgba(26,29,38,0.14)]" />
                      <span className="h-2 w-2 rounded-full bg-[rgba(201,169,110,0.68)]" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.26em] text-[var(--mist)]">
                      {template.status === "available" ? "Disponível" : "Em breve"}
                    </span>
                  </span>

                  <span className="mt-8 block text-xs uppercase tracking-[0.28em] text-[var(--mist)]">
                    {template.category}
                  </span>
                  <span className="mt-4 block font-serif text-4xl leading-none text-[var(--charcoal)] md:text-5xl">
                    {template.title}
                  </span>
                  <span className="mt-5 block max-w-[26rem] text-sm leading-7 text-[var(--stone)]">
                    {template.description}
                  </span>
                </span>

                <span className="absolute bottom-6 left-5 right-5 h-56 overflow-hidden border border-[var(--border)] bg-white md:left-6 md:right-6">
                  <iframe
                    title={`Miniatura do template ${template.title}`}
                    src={template.href}
                    loading="lazy"
                    tabIndex={-1}
                    className="template-card-iframe pointer-events-none border-0 bg-white"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(221,216,205,0.2))]"
                  />
                </span>

                <button
                  type="button"
                  aria-label={`Abrir template ${template.title}`}
                  disabled={template.status !== "available"}
                  onClick={(event) => openTemplatePreview(template, event)}
                  className="absolute inset-0 z-10 cursor-pointer bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-[var(--champagne)] disabled:cursor-not-allowed"
                />
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedTemplate ? (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-[rgba(26,29,38,0.72)] px-4 py-6 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeTemplatePreview();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Preview do template ${selectedTemplate.title}`}
            className={[
              "template-modal-panel relative h-[84vh] w-[92vw] overflow-hidden bg-white shadow-[0_42px_120px_rgba(0,0,0,0.38)]",
              "md:h-[80vh] md:w-[80vw]",
              prefersReducedMotion ? "template-modal-panel-reduced" : "",
            ].join(" ")}
            style={modalStyle}
          >
            <button
              type="button"
              aria-label="Fechar preview"
              onClick={closeTemplatePreview}
              className="absolute left-4 top-4 z-10 grid h-11 w-11 place-items-center border border-[rgba(26,29,38,0.14)] bg-white text-xl leading-none text-[var(--charcoal)] shadow-[0_14px_34px_rgba(26,29,38,0.16)] transition-[background,transform] duration-300 hover:-translate-y-0.5 hover:bg-[var(--bone)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
            >
              <span aria-hidden="true">X</span>
            </button>
            <iframe
              title={`Preview do template ${selectedTemplate.title}`}
              src={selectedTemplate.href}
              loading="lazy"
              className="h-full w-full border-0 bg-white"
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
