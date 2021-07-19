import type { BreadcrumbsContextType } from './BreadcrumbsProvider';

export enum PostBreadcrumbsState {
  fromMaterialsPage = 'materials',
  fromMaterialsExpertPage = 'materialsExpert',
  fromExpertsPage = 'experts',
  fromExpertPage = 'expert',
  default = 'default',
}

const configs = {
  postBreadcrumbs: {
    initConfig: [
      {
        pathRegex: /^\/materials\/?$/,
        newState: PostBreadcrumbsState.fromMaterialsPage,
      },
      {
        pathRegex: /^\/experts\/?$/,
        newState: PostBreadcrumbsState.fromExpertsPage,
      },
      {
        pathRegex: /^\/experts\/[1-9][0-9]*\/?$/,
        newState: PostBreadcrumbsState.fromExpertPage,
      },
    ],
    pushConfig: [
      {
        pathRegex: /^\/materials\/?$/,
        newState: PostBreadcrumbsState.fromMaterialsPage,
      },
      {
        pathRegex: /^\/experts\/?$/,
        newState: PostBreadcrumbsState.fromExpertsPage,
      },
    ],
    basedOnPrevConfigType: [
      {
        prevPathRegex: /^\/materials\/?$/,
        currPathRegex: /^\/experts\/[1-9][0-9]*\/?$/,
        newState: PostBreadcrumbsState.fromMaterialsExpertPage,
      },
    ],
    ignoredPaths: [
      /^\/(experts|materials)\/?$/,
      /^\/(experts|posts)\/[1-9][0-9]*\/?$/,
    ],
    defaultState: PostBreadcrumbsState.default,
  },
};

export type BreadcrumbsType = keyof typeof configs;
export const breadcrumbsConfigs: BreadcrumbsContextType = configs;
