/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
// import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../../old/store/rootReducer';
import PostDirectionChip from '../PostDirectionChip/PostDirectionChip';

export interface IChipsListProps {
  checkedNames: string;
  isLabelItem?: boolean;
  max?: boolean;
}

const ChipsList: React.FC<IChipsListProps> = ({ checkedNames }) => {
  const { directions } = useSelector(
    (state: RootStateType) => state.properties,
  );

  // const history = useHistory();

  const destructNamesString = (str: string) => {
    const arr = str.split('+');

    const directionNames = arr[0].split(',').map((e) => e.trim());
    const restCounter = arr[1];

    return { directionNames, restCounter };
  };

  const { directionNames: dirNames, restCounter } = destructNamesString(
    checkedNames,
  );

  // const handleDelete = (directionToDelete: any) => () => {
  //   // if (directions) {
  //   const dirDel = dirNames.filter(
  //     (direction) => direction !== directionToDelete,
  //   );
  //   // console.log(dirDel);
  //   // history.push(`/experts?directions=${dirDel}`);
  //   // }
  //   return dirDel;
  // };

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
                  // handleDelete={handleDelete(direction.id)}
                />
              );
            }

            return (
              <PostDirectionChip
                key={directionName}
                labelName={directionName}
                // handleDelete={handleDelete(directionName)}
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
