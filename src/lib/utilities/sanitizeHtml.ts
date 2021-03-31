import DOMPurify, { Config } from 'dompurify';

const config: Config = {
  KEEP_CONTENT: true,
};
// Disabling for DOMPurify overloads to work as return type
export const sanitizeHtml = (data: string): string => {
  return DOMPurify.sanitize(data, config) as string;
};
