import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../../models/rootReducer';
import PostDirectionChip from './PostDirectionChip';

export interface IChipsListProps {
  checkedNames: string;
  isLabelItem?: boolean;
  max?: boolean;
}

const ChipsList: React.FC<IChipsListProps> = ({ checkedNames }) => {
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
                <PostDirectionChip
                  key={direction.id}
                  // backgroundColor={isLabelItem && max ? '' : direction.color}
                  labelName={direction.label}
                />
              );
            }

            return (
              <PostDirectionChip
                key={directionName}
                labelName={directionName}
              />
            );
          })}
          {restCounter ? (
            <>
              {' '}
              + <PostDirectionChip labelName={restCounter} />
            </>
          ) : null}
        </>
      )}
    </>
  );
};

export default ChipsList;
