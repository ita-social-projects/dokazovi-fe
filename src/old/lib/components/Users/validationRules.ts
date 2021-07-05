import i18n, { langTokens } from '../../../../locales/localizationInit';

export const emailValidationObj = {
  required: {
    value: true,
    message: i18n.t(langTokens.loginRegistration.recuired),
  },
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: i18n.t(langTokens.loginRegistration.incorrectEmail),
  },
  maxLength: {
    value: 40,
    message: i18n.t(langTokens.loginRegistration.maxLenForEmail),
  },
};

export const passwordValidationObj = {
  required: {
    value: true,
    message: i18n.t(langTokens.loginRegistration.recuired),
  },
  minLength: {
    value: 4,
    message: i18n.t(langTokens.loginRegistration.minLenForPassword),
  },
  maxLength: {
    value: 16,
    message: i18n.t(langTokens.loginRegistration.maxLenForPassword),
  },
};
