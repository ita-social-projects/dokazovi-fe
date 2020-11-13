import { DirectionEnum } from '../../types';

export type DirectionPropertiesType = {
  [key in DirectionEnum]: {
    color: string;
    cyrillic: string;
  };
};

export const directionProperties: DirectionPropertiesType = {
  [DirectionEnum.CARDIOLOGY]: {
    color: 'violet',
    cyrillic: 'Кардіологія',
  },
  [DirectionEnum.PEDIATRICS]: {
    color: 'yellow',
    cyrillic: 'Педіатрія',
  },
  [DirectionEnum.THERAPY]: {
    color: 'yellow',
    cyrillic: 'Терапія',
  },
  [DirectionEnum.COVID19]: {
    color: 'red',
    cyrillic: 'Covid-19',
  },
};
