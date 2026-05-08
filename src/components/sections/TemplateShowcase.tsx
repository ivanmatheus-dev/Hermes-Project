"use client";

import {
  useEffect,
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
  templateFrameRef: RefObject<HTMLDivElement | null>;
  templateWaveRef: RefObject<HTMLDivElement | null>;
};

const templates: TemplatePreview[] = [
  {
    id: "clinica-sorriso-integral",
    title: "Clínica Sorriso Integral",
    category: "Landing page premium",
    description:
      "Um site pronto para apresentar uma clínica com calma, autoridade e caminho direto para agendamento.",
    href: "/templates/template 3/dist/index.html",
    status: "available",
  },
  {
    id: "institucional-editorial",
    title: "Institucional Editorial",
    category: "Institucional",
    description:
      "Estrutura para marcas de serviço que precisam explicar valor com presença visual mais sofisticada.",
    href: "#",
    status: "soon",
  },
  {
    id: "servico-local",
    title: "Serviço Local",
    category: "Captação local",
    description:
      "Página enxuta para negócios locais transformarem buscas e indicações em conversas comerciais.",
    href: "#",
    status: "soon",
  },
];

const activeTemplate = templates[0];

export function TemplateShowcase({
  prefersReducedMotion,
  sectionRef,
  templateFrameRef,
  templateWaveRef,
}: TemplateShowcaseProps) {
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
        className="relative overflow-hidden bg-transparent px-5 py-24 text-[var(--charcoal)] md:px-10 md:py-28 lg:px-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[56%] top-0 h-[61rem] w-[26rem] rounded-[50%] border-l-[2.125rem] border-[rgba(201,169,110,0.14)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[4%] top-[11rem] h-[41rem] w-[22.5rem] rounded-[50%] border-l-[1.25rem] border-[rgba(126,126,118,0.08)]"
        />

        <div className="relative mx-auto max-w-[78rem] border-t border-[rgba(201,169,110,0.4)] pt-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div data-reveal className="max-w-[51.25rem]">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.32em] text-[var(--mist)]">
                Projetos em destaque
              </p>
              <h2 className="font-serif text-[clamp(3rem,4.8vw,4rem)] font-medium leading-[0.96] text-[var(--charcoal)]">
                Uma vitrine real para os sites que a Hermes coloca no ar.
              </h2>
            </div>
          </div>

          <div
            data-reveal
            className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,47.5rem)_26rem] lg:items-center"
          >
            <div
              ref={templateFrameRef}
              className="paintable-card template-featured-frame relative overflow-hidden rounded-[2.625rem] border border-[var(--border)] bg-[var(--bone)] p-6 shadow-[0_24px_70px_rgba(26,29,38,0.08)]"
            >
              <span
                aria-hidden="true"
                className="paint-fill template-preview-paint-fill pointer-events-none"
              />
              <div
                ref={templateWaveRef}
                aria-hidden="true"
                className="template-featured-wave pointer-events-none absolute inset-0"
              />
              <div className="relative z-10 h-[26rem] overflow-hidden rounded-[2.125rem] border border-[var(--border)] bg-[#F1EEE7] p-5">
                <iframe
                  title={`Miniatura do template ${activeTemplate.title}`}
                  src={activeTemplate.href}
                  loading="lazy"
                  tabIndex={-1}
                  className="template-featured-iframe pointer-events-none border-0 bg-white"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0),rgba(221,216,205,0.18))]"
                />
              </div>
            </div>

            <article className="lg:py-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-[var(--charcoal)] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--bone)]">
                <span className="h-1.5 w-1.5 rounded-sm bg-[var(--champagne)]" />
                Slide 01 / disponível
              </span>
              <h3 className="mt-5 font-serif text-[clamp(2.35rem,4vw,2.5rem)] font-medium leading-[1.03]">
                {activeTemplate.title}
              </h3>
              <p className="mt-5 text-sm leading-[1.65] text-[var(--stone)]">
                {activeTemplate.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--mist)]">
                <span>{activeTemplate.category}</span>
                <span aria-hidden="true">/</span>
                <span>Serviço premium</span>
              </div>
              <button
                type="button"
                aria-label={`Abrir template ${activeTemplate.title}`}
                onClick={(event) => openTemplatePreview(activeTemplate, event)}
                className="mt-6 inline-flex items-center gap-3 rounded-full border border-[var(--champagne)] px-5 py-3 text-xs font-semibold tracking-[0.08em] text-[var(--charcoal)] transition-[background,transform] duration-300 hover:-translate-y-0.5 hover:bg-[rgba(201,169,110,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--champagne)]"
              >
                Abrir preview
                <span aria-hidden="true" className="text-[var(--champagne)]">
                  →
                </span>
              </button>
            </article>
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
