import { format } from 'date-fns';
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
  showTime = false,
): string => {
  if (dateValue) {
    const fullDate = new Date(dateValue);
    const displayDate = showTime
      ? format(fullDate, `HH:mm, d ${monthNames[fullDate.getMonth() + 1]} yyyy`)
      : format(fullDate, `d ${monthNames[fullDate.getMonth() + 1]}`);
    return displayDate;
  }
  return `${dateValue}`;
};

export const displayShortDate = (
  dateValue: number | string = '',
  showTime = false,
): string => {
  if (dateValue) {
    const displayDate = showTime
      ? format(new Date(dateValue), 'dd.LL.yyyy HH:mm')
      : format(new Date(dateValue), 'dd.LL.yyyy');
    return displayDate;
  }
  return `${dateValue}`;
};

export const requestDate = (value: Date): string => {
  return value.toISOString().substring(0, 10);
};
