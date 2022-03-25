export const parsDate = (date: string | undefined): string | undefined => {
  return date && new Date(date).toISOString();
};
