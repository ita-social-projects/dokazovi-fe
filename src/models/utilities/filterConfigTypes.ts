import { FilterConfigType } from '../materials/types';

export const allCheckedFilterConfig = [
  { id: '1', name: 'Стаття', checked: true },
  { id: '2', name: 'Відео', checked: true },
  { id: '3', name: 'Допис', checked: true },
] as FilterConfigType[];

export const allUncheckedFilterConfig = [
  { id: '1', name: 'Стаття', checked: false },
  { id: '2', name: 'Відео', checked: false },
  { id: '3', name: 'Допис', checked: false },
] as FilterConfigType[];
