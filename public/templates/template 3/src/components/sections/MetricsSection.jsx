import { InlineIcon } from '../icons/InlineIcon';
import { Reveal } from '../ui/Reveal';
import { proofContent } from '../../content/proof';

export function MetricsSection() {
  return (
    <section className="proof-section">
      <div className="section-shell proof-shell">
        <Reveal className="proof-title-wrap" delay={40}>
          <p className="proof-title">{proofContent.title}</p>
        </Reveal>

        <div className="proof-grid">
          {proofContent.seals.map((seal, index) => (
            <Reveal className="proof-card" delay={100 + index * 60} key={seal.title}>
              <span className="proof-icon">
                <InlineIcon name={seal.icon} size={28} />
              </span>
              <h3>{seal.title}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
