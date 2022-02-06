import { IHeaderProps } from './types';
import i18n, { langTokens } from '../../locales/localizationInit';

export const navElements: IHeaderProps[] = [
  {
    id: 'main',
    label: i18n.t(langTokens.common.main),
    url: '/',
  },
  {
    id: 'materials',
    label: i18n.t(langTokens.common.materials),
    url: '/materials',
  },
  {
    id: 'experts',
    label: i18n.t(langTokens.common.experts),
    url: '/experts',
  },
];
