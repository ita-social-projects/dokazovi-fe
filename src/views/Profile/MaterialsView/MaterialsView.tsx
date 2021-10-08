import React from 'react';
import { IExpert } from '../../../old/lib/types';
import MaterailsList from './MaterailsList';
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
      <MaterailsList />
      <MaterialsDraft expertId={expert.id} expert={expert} />
      <MaterialsPublished expertId={expert.id} expert={expert} />
    </>
  );
};
