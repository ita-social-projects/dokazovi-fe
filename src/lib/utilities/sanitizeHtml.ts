import DOMPurify, { Config } from 'dompurify';

const config: Config = {
  KEEP_CONTENT: true,
};
// Disabling for DOMPurify overloads to work as return type
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const sanitizeHtml = (data: string) => {
  return DOMPurify.sanitize(data, config);
};
