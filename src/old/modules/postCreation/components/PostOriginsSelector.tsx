import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckboxDropdownFilterForm } from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { MAX_POST_ORIGINS } from '../../../lib/constants/posts';
import { IOrigin } from '../../../lib/types';
import { RootStateType } from '../../../../models/rootReducer';
import {
  defaultPlural,
  langTokens,
} from '../../../../locales/localizationInit';

interface IPostOriginsSelector {
  selectedOrigins: IOrigin[];
  onSelectedOriginsChange: (origins: IOrigin[]) => void;
}

export const PostOriginsSelector: React.FC<IPostOriginsSelector> = ({
  selectedOrigins,
  onSelectedOriginsChange,
}) => {
  const { t } = useTranslation();
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

    onSelectedOriginsChange(origins);
  };

  return (
    <>
      {allOrigins.length ? (
        <CheckboxDropdownFilterForm
          onFormChange={handleOriginsChange}
          possibleFilters={allOrigins}
          selectedFilters={selectedOrigins}
          noAll
          maximumReached={selectedOrigins.length === MAX_POST_ORIGINS}
          filterTitle={`${t(langTokens.common.origin, defaultPlural)}: `}
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
