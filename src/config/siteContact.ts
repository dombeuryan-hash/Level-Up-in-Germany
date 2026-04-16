/**
 * Coordonnées affichées sur le site (footer, etc.).
 * Mettre à jour ici pour tout synchroniser.
 */
export const SITE_CONTACT = {
  email: 'info@levelupingermany.com',
  phoneDisplay: '+49 1520 4256834',
} as const;

export function siteContactTelHref(phoneDisplay: string) {
  return `tel:${phoneDisplay.replace(/\s/g, '')}`;
}
