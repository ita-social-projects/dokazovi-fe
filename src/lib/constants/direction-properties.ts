/* eslint-disable import/no-cycle */
import { IDirection } from '../types';

export type DirectionPropertiesType = {
  [key: string]: IDirection;
};

export const DIRECTION_PROPERTIES: DirectionPropertiesType = {
  '1': {
    id: 1,
    color: '#ef5350',
    name: 'COVID-19',
    route: 'covid-19',
  },
  '2': {
    id: 2,
    color: '#98ef50',
    name: 'Офтальмологія',
    route: 'ophthalmology',
  },
  '3': {
    id: 3,
    color: '#7aebbf',
    name: 'Хірургія',
    route: 'surgery',
  },
  '4': {
    id: 4,
    color: '#ffee58',
    name: 'Терапія',
    route: 'therapy',
  },
  '5': {
    id: 5,
    color: '#da80e8',
    name: 'Вірусологія',
    route: 'virology',
  },
  '6': {
    id: 6,
    color: '#d1c4e9',
    name: 'Кардіологія',
    route: 'cardiology'
  },
  '7': {
    id: 7,
    color: '#ffee58',
    name: 'Педіатрія',
    route: 'pediatrics',
  },
};
