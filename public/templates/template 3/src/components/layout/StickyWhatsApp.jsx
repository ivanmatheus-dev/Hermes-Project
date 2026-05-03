import { InlineIcon } from '../icons/InlineIcon';
import { brand } from '../../content/site';
import { stickyWhatsApp } from '../../content/footer';

export function StickyWhatsApp() {
  return (
    <a className="sticky-whatsapp" href={brand.whatsappHref} aria-label={stickyWhatsApp.label}>
      <InlineIcon name="message-circle" className="sticky-whatsapp-icon" size={24} />
      <span className="sticky-whatsapp-copy">
        <strong>{stickyWhatsApp.label}</strong>
        <span>{stickyWhatsApp.message}</span>
      </span>
    </a>
  );
}
