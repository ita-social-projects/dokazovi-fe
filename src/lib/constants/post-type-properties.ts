import { PostTypeEnum } from '../types';

export type PostTypePropertiesType = {
  [key in PostTypeEnum]: {
    name: string;
  };
};

export const postTypeProperties: PostTypePropertiesType = {
  [PostTypeEnum.DOPYS]: {
    name: 'Допис',
  },
  [PostTypeEnum.ARTICLE]: {
    name: 'Стаття',
  },
  [PostTypeEnum.VIDEO]: {
    name: 'Відео',
  },
};
