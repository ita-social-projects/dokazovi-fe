import React from 'react';
import { useSelector } from 'react-redux';
import { IExpert } from '../../../old/lib/types';
import { selectAuthorities } from '../../../models/authorities';
import MaterialsDraft from './MaterialsDraft';
import MaterialsPublished from './MaterialsPublished';
import MaterialsTable from './MaterialsTable';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  const authorities = useSelector(selectAuthorities);
  const isAdmin = authorities.data?.includes('SET_IMPORTANCE');

  return isAdmin ? (
    <MaterialsTable />
  ) : (
    <>
      <MaterialsDraft expertId={expert.id} expert={expert} />
      <MaterialsPublished expertId={expert.id} expert={expert} />
    </>
  );
};
