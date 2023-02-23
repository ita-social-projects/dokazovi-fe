import { regex } from './regex';

export const validation = {
  name: {
    min: 2,
    max: 30,
    regexp: regex.validString,
  },
  bio: {
    min: 3,
    max: 250,
    regexp: regex.validString,
  },
  sn: {
    min: 10,
    max: 150,
    regexp: regex.validString,
  },
};
