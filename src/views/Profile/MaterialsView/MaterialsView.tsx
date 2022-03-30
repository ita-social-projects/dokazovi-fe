import React from 'react';
import { IExpert } from '../../../old/lib/types';
import { AdminTable } from '../AdminTable/AdminTable';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  return <AdminTable expertId={expert.id} />;
};
