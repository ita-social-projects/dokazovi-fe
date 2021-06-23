import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ITransformPathnameConfig,
  IVirtualHistory,
  IVirtualHistoryRecord,
} from '../../navigation/types';

export const useVirtualHistory = (
  sessionKey: string,
  transformPathnameConfig: ITransformPathnameConfig[],
) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.key);
    if (location.key === undefined) {
      const vtHistory = getVirtualHistory(sessionKey);
      if (
        vtHistory &&
        vtHistory.back[vtHistory.back.length - 1].key === '1' &&
        vtHistory.back[vtHistory.back.length - 1].pathname === location.pathname
      ) {
        console.log('refresh');
        return;
      }
      initVirtualHistory(sessionKey, location.pathname);
      console.log('init');
      return;
    }

    const vtHistory = getVirtualHistory(sessionKey);

    const isBackButtonAction = vtHistory.back.some(
      (value) => value.key === location.key,
    );

    const isForwardButtonAction = vtHistory.forward.some(
      (value) => value.key === location.key,
    );

    const isRefreshAction =
      (vtHistory.back[vtHistory.back.length - 1].key === location.key ||
        vtHistory.back[vtHistory.back.length - 1].key === '1') &&
      vtHistory.back[vtHistory.back.length - 1].pathname === location.pathname;
    console.log(isRefreshAction);
    if (isRefreshAction) {
      console.log('refresh');
    } else if (isBackButtonAction) {
      const keyIdx = vtHistory.back.findIndex(
        (elem) => elem.key === location.key,
      );
      const arr = vtHistory.back.splice(keyIdx + 1);
      console.log('back', arr, keyIdx);
      vtHistory.forward = vtHistory.forward.concat(arr);
    } else if (isForwardButtonAction) {
      const keyIdx = vtHistory.forward.findIndex(
        (elem) => elem.key === location.key,
      );
      const arr = vtHistory.forward.splice(
        vtHistory.forward.length - keyIdx + 1,
      );
      vtHistory.back = vtHistory.back.concat(arr);
      console.log('forward', arr, keyIdx);
    } else {
      console.log('push');
      let pathname = location.pathname;
      vtHistory.back.push({
        key: location.key,
        pathname,
      } as IVirtualHistoryRecord);
    }
    setVirtualHistory(sessionKey, vtHistory);
  }, [location.pathname]);
};

function initVirtualHistory(key: string, pathname: string) {
  const emptyVirtualHistory = {
    back: [{ key: '1', pathname }] as IVirtualHistoryRecord[],
    forward: [] as IVirtualHistoryRecord[],
  } as IVirtualHistory;
  sessionStorage.setItem(key, JSON.stringify(emptyVirtualHistory));
}

function setVirtualHistory(key: string, obj: IVirtualHistory) {
  sessionStorage.setItem(key, JSON.stringify(obj));
}

function getVirtualHistory(key: string) {
  return JSON.parse(sessionStorage.getItem(key) as string) as IVirtualHistory;
}
