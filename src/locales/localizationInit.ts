import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ukrainian } from './uk/ukrainian';

const langResources = {
  uk: { translation: ukrainian },
};

i18n.use(initReactI18next).init({
  resources: langResources,
  lng: localStorage.getItem('lang') ?? 'uk',
  fallbackLng: 'uk',
  interpolation: { escapeValue: false },
});

const isLanguagesTokensSame = Object.entries(langResources).every((locale) => {
  return langEqualityCheck(locale[1].translation, langResources.uk.translation);
});

if (!isLanguagesTokensSame)
  throw new Error('The tokens of the languages used do not match.');

type LangTokensType = typeof langResources.uk.translation;

/* eslint-disable @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access,  @typescript-eslint/no-unsafe-assignment */
export const langTokens: LangTokensType = getLangTokens(
  langResources.uk.translation,
);

export default i18n;

export const defaultPlural = { count: 999 };

function getLangTokens(lang, prevKey = '') {
  if (typeof lang === 'object') {
    const tmp = {};
    Object.keys(lang).forEach((key) => {
      const currKey = prevKey ? `${prevKey}.${key}` : key;
      if (typeof lang[key] === 'object') {
        tmp[key] = getLangTokens(lang[key], currKey);
      } else {
        tmp[key] = `${currKey}`;
      }
    });
    return tmp;
  }
  return prevKey ? `${prevKey}.${String(lang)}` : lang;
}

function langEqualityCheck(lang1, lang2): boolean {
  let isSame = true;
  try {
    if (typeof lang1 === 'object' && typeof lang2 === 'object') {
      Object.keys(lang1).forEach((key) => {
        if (typeof lang1[key] === 'object') {
          isSame = isSame && langEqualityCheck(lang1[key], lang2[key]);
        } else if (!key.includes('_') && lang1[key] !== lang2[key])
          isSame = false;
      });
    } else if (typeof lang1 === 'string' && typeof lang2 === 'string') {
      if (!lang1.includes('_') && lang1 !== lang2) isSame = false;
    } else isSame = false;
  } catch (e) {
    isSame = false;
  }
  return isSame;
}
