import { useState } from 'react';
import { InlineIcon } from '../icons/InlineIcon';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { FormField } from '../ui/FormField';
import { faqContent } from '../../content/faq';

function FaqCard({ item, delay }) {
  return (
    <Reveal className="faq-card" delay={delay}>
      <h3>{item.question}</h3>
      <p>{item.answer}</p>
    </Reveal>
  );
}

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    interest: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="faq-section" id="agendamento">
      <div className="section-shell faq-shell">
        <SectionHeading
          eyebrow={faqContent.eyebrow}
          title={faqContent.title}
          subtitle={faqContent.subtitle}
          centered
        />

        <div className="faq-grid">
          <div className="faq-list">
            {faqContent.questions.map((item, index) => (
              <FaqCard key={item.question} item={item} delay={80 + index * 60} />
            ))}
          </div>

          <Reveal className="schedule-card" delay={180}>
            <h3>{faqContent.form.title}</h3>
            <p>{faqContent.form.copy}</p>

            <form className="schedule-form" onSubmit={handleSubmit}>
              <FormField label={faqContent.form.nameLabel}>
                <input
                  type="text"
                  placeholder={faqContent.form.namePlaceholder}
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </FormField>

              <FormField label={faqContent.form.phoneLabel}>
                <input
                  type="tel"
                  placeholder={faqContent.form.phonePlaceholder}
                  value={formState.phone}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </FormField>

              <FormField label={faqContent.form.interestLabel}>
                <div className="select-wrap">
                  <select
                    value={formState.interest}
                    onChange={(event) =>
                      setFormState((current) => ({ ...current, interest: event.target.value }))
                    }
                  >
                    <option value="">{faqContent.form.interestPlaceholder}</option>
                    {faqContent.form.interestOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <InlineIcon name="chevron-down" size={18} className="select-icon" />
                </div>
              </FormField>

              <button className="schedule-button" type="submit">
                <InlineIcon name="calendar-check" size={19} />
                <span>{faqContent.form.submit}</span>
              </button>

              <p className="schedule-privacy">{faqContent.form.privacy}</p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
