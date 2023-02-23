import i18n, { langTokens } from 'locales/localizationInit';

export const validateInput = (
  value: string,
  minSymbols: number,
  maxSymbols: number,
  regexp: RegExp,
): string => {
  if (value && !regexp.test(value)) {
    return i18n.t(langTokens.admin.allowedChar);
  }
  if (!value || value.length < minSymbols) {
    return `${i18n.t(langTokens.admin.minRequired)} ${minSymbols} ${i18n.t(
      langTokens.admin.symbols,
    )}`;
  }
  if (value.length > maxSymbols) {
    return `${i18n.t(langTokens.admin.maxRequired)} ${maxSymbols} ${i18n.t(
      langTokens.admin.symbols,
    )}`;
  }
  return '';
};
