
export type PostTypePropertiesType = {
  [key: string]: {
    id: number;
    name: string;
  };
};

export const postTypeProperties: PostTypePropertiesType = {
  '1': {
    id: 1,
    name: 'Стаття',
  },
  '2': {
    id: 2,
    name: 'Допис',
  },
  '3': {
    id: 3,
    name: 'Відео',
  },
};
