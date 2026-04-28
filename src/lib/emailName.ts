type ParsedEmailName = {
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
};

function toTitleCaseToken(token: string): string {
  if (!token) return token;
  return token[0].toUpperCase() + token.slice(1).toLowerCase();
}

// Generic/role email prefixes that should not be treated as personal names
const GENERIC_PREFIXES = new Set([
  'info', 'contact', 'hello', 'support', 'admin', 'team', 'no-reply', 'noreply',
  'office', 'mail', 'email', 'webmaster', 'postmaster', 'newsletter', 'news',
  'help', 'sales', 'marketing', 'bonjour', 'service',
]);

export function parseNameFromEmail(email: string): ParsedEmailName {
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) {
    return { firstName: null, lastName: null, fullName: null };
  }

  // local-part examples: john.doe, jane_doe+newsletter, emilie-dupont
  const rawLocalPart = email.slice(0, atIndex).split('+')[0] ?? '';
  const normalized = rawLocalPart
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!normalized) {
    return { firstName: null, lastName: null, fullName: null };
  }

  // Reject if the whole local-part (before any separator) is a generic prefix
  if (GENERIC_PREFIXES.has(normalized.toLowerCase())) {
    return { firstName: null, lastName: null, fullName: null };
  }

  const tokens = normalized
    .split(' ')
    .map((part) => part.trim())
    // Must have at least 2 alphabetic characters (filters "x9", "a1b", etc.)
    .filter((part) => (part.match(/[a-zA-Z]/g) ?? []).length >= 2)
    // Real names contain no digits
    .filter((part) => !/\d/.test(part))
    .filter((part) => !GENERIC_PREFIXES.has(part.toLowerCase()))
    .map(toTitleCaseToken);

  if (tokens.length === 0) {
    return { firstName: null, lastName: null, fullName: null };
  }

  const firstName = tokens[0] ?? null;
  const lastName = tokens.length > 1 ? tokens.slice(1).join(' ') : null;
  const fullName = [firstName, lastName].filter(Boolean).join(' ') || null;

  return { firstName, lastName, fullName };
}
