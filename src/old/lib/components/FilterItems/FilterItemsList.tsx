import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/rootReducer';
import { PostDirectionItem } from './PostDirectionItem';

export interface IFilterItemsListProps {
  checkedNames: string;
  isDisabledFilter: boolean;
  checked: boolean;
}

export const FilterItemsList: React.FC<IFilterItemsListProps> = ({
  checkedNames,
  isDisabledFilter,
  checked,
}) => {
  const { directions } = useSelector(
    (state: RootStateType) => state.properties,
  );

  const destructNamesString = (str: string) => {
    const arr = str.split('+');

    const directionNames = arr[0].split(',').map((e) => e.trim());
    const restCounter = arr[1];

    return { directionNames, restCounter };
  };

  const { directionNames: dirNames, restCounter } = destructNamesString(
    checkedNames,
  );

  return (
    <>
      {dirNames[0] && (
        <>
          {dirNames.map((directionName) => {
            const direction = directions.find(
              (dir) => dir.name === directionName,
            );
            if (direction) {
              return (
                <PostDirectionItem
                  key={direction.id}
                  labelName={direction.label}
                  isDisabledFilter={isDisabledFilter}
                  checked={checked}
                />
              );
            }
            return (
              <PostDirectionItem
                key={directionName}
                labelName={directionName}
                isDisabledFilter={isDisabledFilter}
                checked={checked}
              />
            );
          })}
          {restCounter ? (
            <>
              {' '}
              + <PostDirectionItem labelName={restCounter} />
            </>
          ) : null}
        </>
      )}
    </>
  );
};
