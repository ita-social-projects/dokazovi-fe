/* eslint-disable */
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

type ActionsType = ((...params: any[]) => void)[];

export function useActions(
  actions: ActionsType,
  deps?: unknown[],
): ActionsType {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      return actions.map((a) => bindActionCreators(a, dispatch));
    },
    deps ? [dispatch, ...deps] : [dispatch],
  );
}
