import { CircularProgress } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CheckboxDropdownFilterForm } from '../../../lib/components/Filters/CheckboxDropdownFilterForm';
import { CheckboxFormStateType } from '../../../lib/components/Filters/CheckboxFilterForm';
import { MAX_POST_DIRECTIONS } from '../../../lib/constants/posts';
import { IDirection } from '../../../lib/types';
import { RootStateType } from '../../../../models/rootReducer';
import {
  defaultPlural,
  langTokens,
} from '../../../../locales/localizationInit';

interface IPostDirectionsSelector {
  selectedDirections: IDirection[];
  onSelectedDirectionsChange: (directions: IDirection[]) => void;
}

export const PostDirectionsSelector: React.FC<IPostDirectionsSelector> = ({
  selectedDirections,
  onSelectedDirectionsChange,
}) => {
  const { t } = useTranslation();
  const allDirections = useSelector(
    (state: RootStateType) => state.properties.directions,
  );

  const handleDirectionsChange = (checkedDirections: CheckboxFormStateType) => {
    const checkedIds = Object.keys(checkedDirections).filter(
      (key) => checkedDirections[key],
    );

    const directions: IDirection[] = allDirections.filter((direction) =>
      checkedIds.includes(direction.id.toString()),
    );

    onSelectedDirectionsChange(directions);
  };

  return (
    <>
      {allDirections.length ? (
        <CheckboxDropdownFilterForm
          onFormChange={handleDirectionsChange}
          possibleFilters={allDirections}
          selectedFilters={selectedDirections}
          noAll
          maximumReached={selectedDirections.length === MAX_POST_DIRECTIONS}
          filterTitle={`${t(langTokens.common.direction, defaultPlural)}: `}
        />
      ) : (
        <CircularProgress />
      )}
    </>
  );
};
