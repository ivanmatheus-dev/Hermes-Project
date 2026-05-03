import { InlineIcon } from '../icons/InlineIcon';
import { brand, brandTone } from '../../content/site';
import { footerContent } from '../../content/footer';

export function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="section-shell footer-shell">
        <div className="footer-grid">
          <section className="footer-brand">
            <span className="footer-mark">{brand.shortName}</span>
            <p>{brandTone.tagline}</p>
            <p>{footerContent.brandCopy}</p>
            <div className="footer-socials">
              {footerContent.social.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label}>
                  <InlineIcon name={social.icon} size={18} />
                </a>
              ))}
            </div>
          </section>

          <section className="footer-column">
            <h3>Dados técnicos</h3>
            <p>{brand.technicalLead}</p>
            <p>{brand.cnpj}</p>
          </section>

          <section className="footer-column">
            <h3>Endereço</h3>
            <p>{brand.address}</p>
            <a className="footer-map-link" href={brand.mapsHref} target="_blank" rel="noreferrer">
              <InlineIcon name="map-pin" size={16} />
              <span>Ver rota no Google Maps</span>
            </a>
          </section>
        </div>

        <div className="footer-compliance">
          <p>{footerContent.note}</p>
          <div className="footer-legal-links">
            <a href={footerContent.privacyHref}>Privacidade</a>
            <a href={footerContent.termsHref}>Termos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
