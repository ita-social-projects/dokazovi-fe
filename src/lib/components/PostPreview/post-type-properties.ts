import { PostTypeEnum } from '../../types';

export type PostTypePropertiesType = {
  [key in PostTypeEnum]: {
    cyrillic: string;
  };
};

export const postTypeProperties: PostTypePropertiesType = {
  [PostTypeEnum.DOPYS]: {
    cyrillic: 'Допис',
  },
  [PostTypeEnum.ARTICLE]: {
    cyrillic: 'Стаття',
  },
  [PostTypeEnum.VIDEO]: {
    cyrillic: 'Відео',
  },
};
