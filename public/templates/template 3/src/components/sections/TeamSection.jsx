import { InlineIcon } from '../icons/InlineIcon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { aboutContent } from '../../content/about';

function ProofCard({ item, delay }) {
  return (
    <Reveal className="authority-card" delay={delay}>
      <span className="icon-tile">
        <InlineIcon name={item.icon} size={20} />
      </span>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </Reveal>
  );
}

export function TeamSection() {
  return (
    <section className="about-section" id="sobre">
      <div className="section-shell about-shell">
        <SectionHeading
          eyebrow={aboutContent.eyebrow}
          title={aboutContent.title}
          subtitle={aboutContent.intro}
          centered
        />

        <div className="about-grid">
          <Reveal className="about-visual-card" delay={80}>
            <div className="about-image-wrap">
              <img src={aboutContent.image} alt={aboutContent.imageCaptionTitle} />
              <div className="about-caption">
                <h3>{aboutContent.imageCaptionTitle}</h3>
                <p>{aboutContent.imageCaptionText}</p>
              </div>
            </div>
          </Reveal>

          <div className="about-copy">
            <Reveal className="about-lead-card" delay={120}>
              <h3>{aboutContent.leadTitle}</h3>
              <p>{aboutContent.leadCopy}</p>
            </Reveal>

            <div className="authority-grid">
              {aboutContent.proofs.map((item, index) => (
                <ProofCard key={item.title} item={item} delay={180 + index * 60} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
