import React from 'react';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../models/rootReducer';
import { PostDirectionChip } from '../PostDirectionChip/PostDirectionChip';
import { ChipFilterType, IOrigin, IPostType } from '../../../old/lib/types';

export interface IChipsListProps {
  checkedNames: string;
  chipsListType?: ChipFilterType;
  filtersPlural?: IOrigin[] | IPostType[];
  handleDelete?: (
    arg0: number | undefined,
    arg1: ChipFilterType | undefined,
  ) => void;
  TheOnlyAvailablePostType?: string;
  TheOnlyAvailableDirection?: string;
}

export const ChipsList: React.FC<IChipsListProps> = ({
  checkedNames,
  chipsListType,
  handleDelete,
  filtersPlural,
  TheOnlyAvailablePostType,
  TheOnlyAvailableDirection,
}) => {
  const { directions } = useSelector(
    (state: RootStateType) => state.properties,
  );
  const { regions } = useSelector((state: RootStateType) => state.properties);

  const { origins } = useSelector((state: RootStateType) => state.properties);

  const { postTypes } = useSelector((state: RootStateType) => state.properties);

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

  if (TheOnlyAvailablePostType) {
    return (
      <PostDirectionChip
        key={TheOnlyAvailablePostType}
        labelName={TheOnlyAvailablePostType}
        theOnlyAvailable={Boolean(TheOnlyAvailablePostType)}
      />
    );
  }
  if (TheOnlyAvailableDirection) {
    return (
      <PostDirectionChip
        key={TheOnlyAvailableDirection}
        labelName={TheOnlyAvailableDirection}
        theOnlyAvailable={Boolean(TheOnlyAvailableDirection)}
      />
    );
  }

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
            const origin = origins.find((or) => or.name === directionName);
            if (origin) {
              return (
                <PostDirectionChip
                  key={directionName}
                  labelName={directionName}
                  handleDelete={() => onHandleDelete(origin.id)}
                />
              );
            }
            const originPlural = filtersPlural?.find(
              (or) => or.name === directionName,
            );
            if (originPlural) {
              return (
                <PostDirectionChip
                  key={directionName}
                  labelName={directionName}
                  handleDelete={() => onHandleDelete(originPlural.id)}
                />
              );
            }
            const postType = postTypes.find(
              (post) => post.name === directionName,
            );
            if (postType) {
              return (
                <PostDirectionChip
                  key={directionName}
                  labelName={directionName}
                  handleDelete={() => onHandleDelete(postType.id)}
                />
              );
            }
            const postTypePlural = filtersPlural?.find(
              (post) => post.name === directionName,
            );
            if (postTypePlural) {
              return (
                <PostDirectionChip
                  key={directionName}
                  labelName={directionName}
                  handleDelete={() => onHandleDelete(postTypePlural.id)}
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
