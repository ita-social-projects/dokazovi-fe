import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../store/rootReducer';
import PostDirectionItem from './PostDirectionItem';

export interface IFilterItemsListProps {
  checkedNames: string;
  isEnabledRegion: boolean;
}

const FilterItemsList: React.FC<IFilterItemsListProps> = ({
  checkedNames,
  isEnabledRegion,
}) => {
  const { directions } = useSelector(
    (state: RootStateType) => state.properties,
  );

  // console.log("filteritems");

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
                  isEnabledRegion={isEnabledRegion}
                />
              );
            }

            return (
              <PostDirectionItem
                key={directionName}
                labelName={directionName}
                isEnabledRegion={isEnabledRegion}
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

export default FilterItemsList;
