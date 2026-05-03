import { InlineIcon } from '../icons/InlineIcon';
import { Reveal } from '../ui/Reveal';
import { heroContent } from '../../content/hero';
import { heroRotator } from '../../content/images';
import { brand } from '../../content/site';

function HeroChip({ icon, label }) {
  return (
    <div className="hero-chip">
      <span className="hero-chip-icon">
        <InlineIcon name={icon} size={18} />
      </span>
      <span>{label}</span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="hero-section" id="top">
      <div className="section-shell hero-shell">
        <div className="hero-grid">
          <Reveal className="hero-copy" delay={60}>
            <span className="hero-badge">{heroContent.badge}</span>
            <h1 className="hero-title">{heroContent.title}</h1>
            <p className="hero-subtitle">{heroContent.subtitle}</p>

            <div className="hero-actions">
              <a
                className="cta-button primary"
                href={brand.whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <InlineIcon name="message-circle" size={20} />
                <span>{heroContent.primaryCta}</span>
              </a>
              <a className="cta-button secondary" href="#agendamento">
                <InlineIcon name="calendar-check" size={18} />
                <span>{heroContent.secondaryCta}</span>
              </a>
            </div>

            <p className="hero-compliance">{heroContent.compliance}</p>
          </Reveal>

          <Reveal className="hero-visual-card" delay={140}>
            <div className="hero-visual-image-wrap">
              <img className="hero-visual-image" src={heroRotator} alt={heroContent.visualTitle} />
            </div>

            <div className="hero-visual-copy">
              <h2>{heroContent.visualTitle}</h2>
              <p>{heroContent.visualCopy}</p>
            </div>

            <div className="hero-chip-grid">
              {heroContent.chips.map((chip) => (
                <HeroChip key={chip.label} icon={chip.icon} label={chip.label} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
