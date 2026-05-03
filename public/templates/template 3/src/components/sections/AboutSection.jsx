import { InlineIcon } from '../icons/InlineIcon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { problemsContent } from '../../content/problems';

function ProblemCard({ item, delay }) {
  return (
    <Reveal className="problem-card" delay={delay}>
      <div className="icon-tile">
        <InlineIcon name={item.icon} size={22} />
      </div>
      <h3>{item.title}</h3>
      <p>{item.body}</p>
    </Reveal>
  );
}

export function AboutSection() {
  return (
    <section className="problems-section" id="escuta">
      <div className="section-shell problems-shell">
        <div className="problems-layout">
          <div className="problems-copy">
            <Reveal delay={40}>
              <div className="section-kicker">
                <span className="section-kicker-dot" />
                <span>{problemsContent.eyebrow}</span>
              </div>
              <h2 className="problems-title">{problemsContent.title}</h2>
              <p className="problems-intro">{problemsContent.intro}</p>
            </Reveal>

            <div className="problems-grid">
              {problemsContent.cards.map((item, index) => (
                <ProblemCard key={item.title} item={item} delay={120 + index * 60} />
              ))}
            </div>
          </div>

          <Reveal className="problems-panel" delay={180}>
            <span className="panel-badge">
              <InlineIcon name="message-circle" size={14} />
              <span>{problemsContent.panel.badge}</span>
            </span>
            <h3>{problemsContent.panel.title}</h3>
            <p>{problemsContent.panel.body}</p>
            <div className="panel-divider" />
            <p className="panel-note">{problemsContent.panel.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
