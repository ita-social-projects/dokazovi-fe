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

export const formatDate = (dateString = '', time = false): string => {
  if (dateString.length) {
    const fullDate = new Date(dateString);
    const hours = fullDate.getHours().toString().padStart(2, '0');
    const mins = fullDate.getMinutes().toString().padStart(2, '0');
    const displayDate = time
      ? `${hours}:${mins}, ${fullDate.getDate()} ${
          monthNames[fullDate.getMonth() + 1]
        } ${fullDate.getFullYear()}`
      : `${fullDate.getDate()} ${monthNames[fullDate.getMonth() + 1]}`;
    return displayDate;
  }
  return dateString;
};
