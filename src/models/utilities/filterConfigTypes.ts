import { FilterConfigType } from '../materials/types';

export const allCheckedFilterConfig = [
  { id: '1', name: 'Статті', checked: true },
  { id: '3', name: 'Дописи', checked: true },
  { id: '2', name: 'Відео', checked: true },
] as FilterConfigType[];

export const allUncheckedFilterConfig = [
  { id: '1', name: 'Статті', checked: false },
  { id: '3', name: 'Дописи', checked: false },
  { id: '2', name: 'Відео', checked: false },
] as FilterConfigType[];
