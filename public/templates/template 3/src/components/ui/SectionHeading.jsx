export function SectionHeading({ eyebrow, title, subtitle, centered = false, className = '' }) {
  return (
    <header
      className={`section-heading ${centered ? 'centered' : ''} ${className}`.trim()}
    >
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </header>
  );
}
