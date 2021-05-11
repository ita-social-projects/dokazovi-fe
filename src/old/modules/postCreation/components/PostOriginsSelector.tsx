import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { CheckboxDropdownFilterForm } from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { MAX_POST_ORIGINS } from '../../../lib/constants/posts';
import { IOrigin } from '../../../lib/types';
import { RootStateType } from '../../../store/rootReducer';

interface IPostOriginsSelector {
  selectedOrigin: IOrigin[];
  onSelectedOriginChange: (origins: IOrigin[]) => void;
}

export const PostOriginsSelector: React.FC<IPostOriginsSelector> = ({
  selectedOrigin,
  onSelectedOriginChange,
}) => {
  const allOrigins = useSelector(
    (state: RootStateType) => state.properties.origins,
  );

  const handleOriginsChange = (checkedOrigins: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedOrigins).filter(
      (key) => checkedOrigins[key],
    );

    const origins: IOrigin[] = allOrigins.filter((origin) =>
      checkedIds.includes(origin.id.toString()),
    );

    onSelectedOriginChange(origins);
  };

  return (
    <>
      {allOrigins.length ? (
        <CheckboxDropdownFilterForm
          onFormChange={handleOriginsChange}
          possibleFilters={allOrigins}
          selectedFilters={selectedOrigin}
          noAll
          maximumReached={selectedOrigin.length === MAX_POST_ORIGINS}
          filterTitle="Джерела: "
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
