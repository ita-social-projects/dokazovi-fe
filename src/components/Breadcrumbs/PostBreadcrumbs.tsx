import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { langTokens } from '../../locales/localizationInit';
import { PostBreadcrumbsState } from './Basic/breadcrumbs-config';
import { useBreadcurmbs } from './Basic/BreadcrumbsProvider';
import { IOrigin, IPostType } from '../../old/lib/types';
import {
  BasicBreadcrumbs,
  BreadcrumbsLinksType,
} from './Basic/BasicBreadcrumbs';

export interface IProps {
  origins: IOrigin[];
  type: IPostType;
  expert: { id: number; expertName: string };
  materialTitle: string;
}

export const PostBreadcrumbs: React.FC<IProps> = ({
  origins,
  type,
  expert,
  materialTitle,
}) => {
  const { key } = useLocation();
  const { t } = useTranslation();
  const state = useBreadcurmbs('postBreadcrumbs', key);

  const materialsLink = {
    to: '/materials',
    label: t(langTokens.common.materials),
  };
  const expertsLink = {
    to: '/experts',
    label: t(langTokens.common.experts),
  };
  const expertLink = {
    to: `/experts/${expert.id}`,
    label: expert.expertName,
  };
  const originLinks = origins.map((origin) => ({
    to: `/materials?origins=${origin.id}`,
    label: origin.name,
  }));

  const typeLink = { to: `/materials?types=${type.id}`, label: type.name };
  const materialMap = [materialsLink, ...originLinks, typeLink];
  const materialExpertMap = [
    materialsLink,
    expertLink,
    ...originLinks,
    typeLink,
  ];
  const expertsMap = [expertsLink, expertLink, typeLink];
  const expertMap = [expertLink, typeLink];
  const defaultMap = [...originLinks, typeLink];

  let breadcrumbsLinks: BreadcrumbsLinksType;

  switch (state) {
    case PostBreadcrumbsState.fromMaterialsPage: {
      breadcrumbsLinks = materialMap;
      break;
    }
    case PostBreadcrumbsState.fromExpertsPage: {
      breadcrumbsLinks = expertsMap;
      break;
    }
    case PostBreadcrumbsState.fromExpertPage: {
      breadcrumbsLinks = expertMap;
      break;
    }
    case PostBreadcrumbsState.fromMaterialsExpertPage: {
      breadcrumbsLinks = materialExpertMap;
      break;
    }
    default: {
      breadcrumbsLinks = defaultMap;
    }
  }

  return (
    <BasicBreadcrumbs
      breadcrumbsLinks={breadcrumbsLinks}
      title={materialTitle}
    />
  );
};
