import React from 'react';
import { IExpert } from '../../../old/lib/types';
import MaterialsTable from './MaterialsTable';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  return (
    <>
      <MaterialsTable />
    </>
  );
};
