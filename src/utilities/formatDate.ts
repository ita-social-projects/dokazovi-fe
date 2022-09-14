import i18n, { langTokens } from '../locales/localizationInit';

const monthNames: { [index: string]: string } = {
  '1': i18n.t(langTokens.date.januaryGenitiveCase),
  '2': i18n.t(langTokens.date.februaryGenitiveCase),
  '3': i18n.t(langTokens.date.marchGenitiveCase),
  '4': i18n.t(langTokens.date.aprilGenitiveCase),
  '5': i18n.t(langTokens.date.mayGenitiveCase),
  '6': i18n.t(langTokens.date.juneGenitiveCase),
  '7': i18n.t(langTokens.date.julyGenitiveCase),
  '8': i18n.t(langTokens.date.augustGenitiveCase),
  '9': i18n.t(langTokens.date.septemberGenitiveCase),
  '10': i18n.t(langTokens.date.octoberGenitiveCase),
  '11': i18n.t(langTokens.date.novemberGenitiveCase),
  '12': i18n.t(langTokens.date.decemberGenitiveCase),
};

export const formatDate = (dateString = ''): string => {
  const [day, month] = dateString.length ? dateString.split('.') : [null, null];

  return day && month ? `${+day.toString()} ${monthNames[+month]}` : '';
};

export const formatDateTime = (dateString = ''): string => {
  if (dateString.length) {
    const [time, date = ''] = dateString.split(' ');
    const [day, month, year] = date.split('.');
    return `${time}, ${day} ${monthNames[+month]} ${year}`;
  }
  return dateString;
};
