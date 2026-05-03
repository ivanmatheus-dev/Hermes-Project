import { InlineIcon } from '../icons/InlineIcon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { treatmentsContent } from '../../content/treatments';
import { brand } from '../../content/site';

function TreatmentCard({ item, delay }) {
  return (
    <Reveal className="treatment-card" delay={delay}>
      <div className="treatment-head">
        <div className="icon-tile">
          <InlineIcon name={item.icon} size={24} />
        </div>
        <h3>{item.title}</h3>
      </div>

      <p className="treatment-copy">{item.body}</p>
      <p className="treatment-benefit">{item.benefit}</p>

      <a className="treatment-link" href={brand.whatsappHref} target="_blank" rel="noreferrer">
        <span>{item.cta}</span>
        <InlineIcon name="arrow-right" size={16} />
      </a>
    </Reveal>
  );
}

export function ServicesSection() {
  return (
    <section className="treatments-section" id="tratamentos">
      <div className="section-shell treatments-shell">
        <SectionHeading
          eyebrow={treatmentsContent.eyebrow}
          title={treatmentsContent.title}
          subtitle={treatmentsContent.intro}
          centered
        />

        <div className="treatments-grid">
          {treatmentsContent.cards.map((item, index) => (
            <TreatmentCard key={item.title} item={item} delay={100 + index * 60} />
          ))}
        </div>
      </div>
    </section>
  );
}
