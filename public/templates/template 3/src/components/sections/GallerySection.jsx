import { InlineIcon } from '../icons/InlineIcon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { testimonialsContent } from '../../content/testimonials';

function Rating() {
  return (
    <div className="testimonial-rating" aria-label="5 estrelas">
      <InlineIcon name="star" size={16} />
      <InlineIcon name="star" size={16} />
      <InlineIcon name="star" size={16} />
      <InlineIcon name="star" size={16} />
      <InlineIcon name="star" size={16} />
    </div>
  );
}

function TestimonialCard({ item, delay }) {
  const initials = item.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <Reveal className="testimonial-card" delay={delay}>
      <Rating />
      <p className="testimonial-quote">{item.quote}</p>
      <div className="testimonial-meta">
        <div className="testimonial-avatar">{initials}</div>
        <div className="testimonial-details">
          <span className="testimonial-context">Paciente</span>
          <strong className="testimonial-name">{item.name}</strong>
        </div>
      </div>
    </Reveal>
  );
}

export function GallerySection() {
  return (
    <section className="testimonials-section" id="depoimentos">
      <div className="section-shell testimonials-shell">
        <SectionHeading
          eyebrow={testimonialsContent.eyebrow}
          title={testimonialsContent.title}
          subtitle={testimonialsContent.subtitle}
          centered
        />

        <div className="testimonial-grid">
          {testimonialsContent.testimonials.map((item, index) => (
            <TestimonialCard key={item.name} item={item} delay={80 + index * 70} />
          ))}
        </div>

        <Reveal className="testimonials-note" delay={260}>
          <InlineIcon name="heart-handshake" size={22} />
          <p>{testimonialsContent.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
