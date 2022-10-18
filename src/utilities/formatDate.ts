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

export const formatDate = (
  dateValue: number | string = '',
  time = false,
): string => {
  if (dateValue) {
    const fullDate = new Date(dateValue);
    const hours = fullDate.getHours().toString().padStart(2, '0');
    const mins = fullDate.getMinutes().toString().padStart(2, '0');
    const displayDate = time
      ? `${hours}:${mins}, ${fullDate.getDate()} ${
          monthNames[fullDate.getMonth() + 1]
        } ${fullDate.getFullYear()}`
      : `${fullDate.getDate()} ${monthNames[fullDate.getMonth() + 1]}`;
    return displayDate;
  }
  return `${dateValue}`;
};

export const displayShortDate = (dateValue: number | string = ''): string => {
  const shortDate: Date = new Date(dateValue);
  return `${shortDate
    .getDate()
    .toString()
    .padStart(2, '0')}.${shortDate
    .getMonth()
    .toString()
    .padStart(2, '0')}.${shortDate.getFullYear()}`;
};
