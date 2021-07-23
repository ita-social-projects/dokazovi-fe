import React from 'react';
import { IExpert } from '../../../old/lib/types';
import MaterialsByStatus from './MaterialsByStatus';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  return (
    <>
      <MaterialsByStatus expertId={expert.id} expert={expert} />
      <div>PublishedMaterials</div>
    </>
  );
};
