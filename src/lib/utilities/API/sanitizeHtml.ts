import DOMPurify from 'dompurify';

export const sanitizeHtml = (data: string): string => {
  return DOMPurify.sanitize(data);
};
