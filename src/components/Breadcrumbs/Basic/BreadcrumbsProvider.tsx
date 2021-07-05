import React, { createContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { BreadcrumbsType } from './breadcrumbs-config';

interface IProps {
  children: React.ReactNode;
  configs: BreadcrumbsContextType;
}

type PathsConfigType = {
  pathRegex: RegExp;
  newState: string;
};

type BasedOnPrevConfigType = {
  prevPathRegex: RegExp;
  currPathRegex: RegExp;
  newState: string;
};

type IgnoredPathsType = RegExp[];

type BreadcrumbsConfigType = {
  initConfig: PathsConfigType[];
  pushConfig: PathsConfigType[];
  basedOnPrevConfigType: BasedOnPrevConfigType[];
  ignoredPaths: IgnoredPathsType;
  defaultState: string;
};

export type BreadcrumbsContextType = {
  [key: string]: BreadcrumbsConfigType;
};

type BreadcrumbsStateType = {
  breadcrumbsState: string;
  path: string;
};

type BreadcrumbsHistoryStoreType = Map<string, BreadcrumbsStateType>;

const BreadcrumbsContext = createContext<BreadcrumbsContextType>({});

export const useBreadcurmbs = (
  breadcrumbsType: BreadcrumbsType,
  locationKey?: string,
): string | null => {
  const map = getMapFromSessionStorage(breadcrumbsType);
  return map?.get(locationKey ?? '1')?.breadcrumbsState ?? null;
};

export const BreadcrumbsProvider: React.FC<IProps> = ({
  children,
  configs: breadcrumbsContext,
}) => {
  const { key, pathname } = useLocation();
  const { action } = useHistory();

  const updateBreadcrumbsState = (
    sessionKey: string,
    config: BreadcrumbsConfigType,
  ) => {
    let statesMap = getMapFromSessionStorage(sessionKey);

    if (action === 'POP' && !key && statesMap) {
      statesMap.set(
        '1',
        getBreadcrumbsInitState(
          pathname,
          config.initConfig,
          config.defaultState,
        ),
      );
    } else if (!statesMap) {
      statesMap = new Map<string, BreadcrumbsStateType>();
      statesMap.set(
        '1',
        getBreadcrumbsInitState(
          pathname,
          config.initConfig,
          config.defaultState,
        ),
      );
    } else if (action === 'PUSH' && key && statesMap) {
      const prevState = statesMap.get('prevState');
      if (prevState) {
        statesMap.set(
          key,
          getBreacrumbsPushState(
            pathname,
            config.pushConfig,
            config.basedOnPrevConfigType,
            config.ignoredPaths,
            prevState,
            config.defaultState,
          ),
        );
      }
    }

    if (statesMap.has(key ?? '1')) {
      const currBreadcrumbsState = statesMap.get(key ?? '1');
      if (currBreadcrumbsState) {
        statesMap.set('prevState', currBreadcrumbsState);
      }
    }
    setMapToSessionStorage(statesMap, sessionKey);
  };

  useEffect(() => {
    Object.entries(breadcrumbsContext).forEach(([sessionKey, config]) =>
      updateBreadcrumbsState(sessionKey, config),
    );
  }, [pathname]);

  return (
    <BreadcrumbsContext.Provider value={breadcrumbsContext}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

function getBreadcrumbsInitState(
  pathname: string,
  initConfig: PathsConfigType[],
  defaultState: string,
) {
  const newState =
    initConfig.find((v) => v.pathRegex.test(pathname))?.newState ?? null;

  return {
    path: pathname,
    breadcrumbsState: newState ?? defaultState,
  } as BreadcrumbsStateType;
}

function getBreacrumbsPushState(
  pathname: string,
  pushConfig: PathsConfigType[],
  basedOnPrevConfigType: BasedOnPrevConfigType[],
  excludedPaths: IgnoredPathsType,
  prevState: BreadcrumbsStateType,
  defaultState: string,
) {
  const isExcluded = excludedPaths.some((v) => v.test(pathname));
  const basedOnPrevState = basedOnPrevConfigType.find(
    (v) =>
      v.prevPathRegex.test(prevState.path) && v.currPathRegex.test(pathname),
  );
  const newState =
    basedOnPrevState?.newState ??
    pushConfig.find((v) => v.pathRegex.test(pathname))?.newState ??
    (isExcluded ? prevState.breadcrumbsState : null);

  return {
    path: pathname,
    breadcrumbsState: newState ?? defaultState,
  } as BreadcrumbsStateType;
}

function setMapToSessionStorage(
  breadcrumbsMap: BreadcrumbsHistoryStoreType,
  sessionKey: string,
) {
  const obj = {};
  breadcrumbsMap?.forEach((v, k) => Object.assign(obj, { [k]: v }));
  if (Object.keys(obj).length === 0) {
    return;
  }
  sessionStorage.setItem(sessionKey, JSON.stringify(obj));
}

function getMapFromSessionStorage(sessionKey: string) {
  let map: BreadcrumbsHistoryStoreType;
  try {
    const strMap = sessionStorage.getItem(sessionKey);
    if (!strMap) {
      throw new Error();
    }
    map = new Map<string, BreadcrumbsStateType>(
      Object.entries(JSON.parse(strMap)),
    );
  } catch {
    return null;
  }
  return map;
}
