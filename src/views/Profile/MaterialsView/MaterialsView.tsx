import React from 'react';
import { IExpert } from '../../../old/lib/types';
import MaterailsTable from './MaterailsTable';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  return (
    <>
      <MaterailsTable />
    </>
  );
};
