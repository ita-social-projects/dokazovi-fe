import React from 'react';
import { IExpert } from '../../../old/lib/types';
import MaterailsList from './MaterailsList';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  return (
    <>
      <MaterailsList />
    </>
  );
};
