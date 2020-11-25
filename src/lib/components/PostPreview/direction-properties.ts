import { DirectionEnum } from '../../types';

export type DirectionPropertiesType = {
  [key in DirectionEnum]: {
    color: string;
    cyrillic: string;
  };
};

export const DIRECTION_PROPERTIES: DirectionPropertiesType = {
  [DirectionEnum.CARDIOLOGY]: {
    color: '#d1c4e9',
    cyrillic: 'Кардіологія',
  },
  [DirectionEnum.PEDIATRICS]: {
    color: '#ffee58',
    cyrillic: 'Педіатрія',
  },
  [DirectionEnum.THERAPY]: {
    color: '#ffee58',
    cyrillic: 'Терапія',
  },
  [DirectionEnum.COVID19]: {
    color: '#ef5350',
    cyrillic: 'COVID-19',
  },
};
