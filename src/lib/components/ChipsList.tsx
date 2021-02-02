import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store/rootReducer';
import PostDirectionChip from './PostDirectionChip';

export interface IChipsListProps {
  checkedNames: string;
  isLabelItem?: boolean;
  max?: boolean;
}

const ChipsList: React.FC<IChipsListProps> = ({
  checkedNames,
  isLabelItem,
  max,
}) => {
  const { directions } = useSelector(
    (state: RootStateType) => state.properties,
  );

  const destructNamesString = (str: string) => {
    const arr = str.split('+');

    const dirNames = arr[0].split(',').map((e) => e.trim());
    const restCounter = arr[1];

    return { dirNames, restCounter };
  };

  const { dirNames, restCounter } = destructNamesString(checkedNames);

  return (
    <>
      {dirNames[0] && (
        <>
          {dirNames.map((dirName) => {
            const direction = directions.find((dir) => dir.name === dirName);
            if (direction) {
              return (
                <PostDirectionChip
                  key={direction.id}
                  backgroundColor={isLabelItem && max ? '' : direction.color}
                  labelName={direction.label}
                />
              );
            }

            return <PostDirectionChip key={dirName} labelName={dirName} />;
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
