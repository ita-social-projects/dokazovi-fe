import DOMPurify, { Config } from 'dompurify';

const config: Config = {
  ALLOWED_TAGS: ['p'],
  KEEP_CONTENT: true,
}; // find new rules for tags

export const sanitizeHtml = (
  data: string,
): string | HTMLElement | DocumentFragment => {
  return DOMPurify.sanitize(data, config);
};
