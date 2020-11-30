import { DirectionEnum } from '../types';

export type DirectionPropertiesType = {
  [key in DirectionEnum]: {
    id?: number;
    color: string;
    name: string;
    route?: string;
  };
};

export const DIRECTION_PROPERTIES: DirectionPropertiesType = {
  [DirectionEnum.CARDIOLOGY]: {
    color: '#d1c4e9',
    name: 'Кардіологія',
  },
  [DirectionEnum.PEDIATRICS]: {
    color: '#ffee58',
    name: 'Педіатрія',
  },
  [DirectionEnum.THERAPY]: {
    id: 4,
    color: '#ffee58',
    name: 'Терапія',
  },
  [DirectionEnum.COVID19]: {
    id: 1,
    color: '#ef5350',
    name: 'COVID-19',
    route: 'covid-19',
  },
  [DirectionEnum.OPHTHALMOLOGY]: {
    id: 2,
    color: '#98ef50',
    name: 'Офтальмологія',
  },
  [DirectionEnum.SURGERY]: {
    id: 3,
    color: '#7aebbf',
    name: 'Хірургія',
  },
  [DirectionEnum.VIROLOGY]: {
    id: 5,
    color: '#da80e8',
    name: 'Вірусологія',
  },
};
