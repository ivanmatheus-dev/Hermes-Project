import { brand } from './site';

export const footerContent = {
  brandCopy: brand.description,
  social: [
    {
      label: 'Instagram',
      icon: 'instagram',
      href: 'https://instagram.com/',
    },
    {
      label: 'Facebook',
      icon: 'facebook',
      href: 'https://facebook.com/',
    },
    {
      label: 'WhatsApp',
      icon: 'message-circle',
      href: brand.whatsappHref,
    },
  ],
  note:
    'Informações de caráter educativo. A indicação de tratamento depende de avaliação individual.',
  copyright: '© 2026 Clínica Sorriso Integral',
  privacyHref: '#',
  termsHref: '#',
};

export const stickyWhatsApp = {
  label: 'Agendar via WhatsApp',
  message: 'Olá, gostaria de agendar uma avaliação.',
};
