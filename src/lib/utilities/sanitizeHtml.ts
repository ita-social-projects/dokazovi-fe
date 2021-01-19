import DOMPurify, { Config } from 'dompurify';

const config: Config = {
  KEEP_CONTENT: true,
};

export const sanitizeHtml = (
  data: string,
): string | HTMLElement | DocumentFragment => {
  return DOMPurify.sanitize(data, config);
};
