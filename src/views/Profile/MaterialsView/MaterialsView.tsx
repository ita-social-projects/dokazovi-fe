import React from 'react';
import { IExpert } from '../../../old/lib/types';
import { AdminTable } from '../AdminTable/AdminTable';
// import { useSelector } from 'react-redux';
// import { selectAuthorities } from '../../../models/authorities';

export interface IExpertProfileViewProps {
  expert: IExpert;
}

export const MaterialsView: React.FC<IExpertProfileViewProps> = ({
  expert,
}) => {
  // на данный момент isAdmin тут не нужен, лучше его определить уже в копоненте админтейбл
  // или где там ниже он вам нужен

  // const authorities = useSelector(selectAuthorities);
  // const isAdmin = authorities.data?.includes('SET_IMPORTANCE');
  return <AdminTable expertId={expert.id} />;
};
