import React from 'react';
import { IExpert } from '../../../old/lib/types';
import MaterialsDraft from './MaterialsDraft';
import MaterialsPublished from './MaterialsPublished';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  return (
    <>
      <MaterialsDraft onDelete expertId={expert.id} expert={expert} />
      <MaterialsPublished onDelete expertId={expert.id} expert={expert} />
    </>
  );
};
