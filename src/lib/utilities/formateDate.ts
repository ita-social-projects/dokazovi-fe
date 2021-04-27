const formatDate = (dateString: string): string => {
  const monthNames: { [index: string]: string } = {
    '1': 'січня',
    '2': 'лютого',
    '3': 'березня',
    '4': 'квітня',
    '5': 'травня',
    '6': 'червня',
    '7': 'липня',
    '8': 'серпня',
    '9': 'вересня',
    '10': 'жовтня',
    '11': 'листопада',
    '12': 'грудня',
  };

  const [day, month] = dateString.split('.');

  return `${+day.toString()} ${monthNames[+month]}`;
};

export default formatDate;
