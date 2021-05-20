import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../old/store/rootReducer';
import PostDirectionChip from '../PostDirectionChip/PostDirectionChip';
import { ChipFilterType, IRegion } from '../../../old/lib/types';

export interface IChipsListProps {
  checkedNames: string;
  isLabelItem?: boolean;
  max?: boolean;
  chipsListType?: ChipFilterType;
  handleDelete?: (
    arg0: number | undefined,
    arg1: ChipFilterType | undefined,
  ) => void;
}

const ChipsList: React.FC<IChipsListProps> = ({
  checkedNames,
  chipsListType,
  handleDelete,
}) => {
  const { directions } = useSelector(
    (state: RootStateType) => state.properties,
  );
  const { regions } = useSelector((state: RootStateType) => state.properties);

  const destructNamesString = (str: string) => {
    const arr = str.split('+');

    const directionNames = arr[0].split(',').map((e) => e.trim());
    const restCounter = arr[1];

    return { directionNames, restCounter };
  };

  const { directionNames: dirNames, restCounter } = destructNamesString(
    checkedNames,
  );

  const onHandleDelete = (key: number) => {
    if (handleDelete) {
      handleDelete(key, chipsListType);
    }
  };

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
                  labelName={direction.label}
                  handleDelete={() => onHandleDelete(direction.id)}
                />
              );
            }

            const region = regions.find((reg) => reg.name === directionName);
            if (region) {
              return (
                <PostDirectionChip
                  key={directionName}
                  labelName={directionName}
                  handleDelete={() => onHandleDelete(region.id)}
                />
              );
            }
            return null;
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
