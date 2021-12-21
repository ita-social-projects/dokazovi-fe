import React, { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';
import { ExpertsList } from '../../../lib/components/Experts/ExpertsList';
import { IExpert } from '../../../lib/types';

interface IAutoPaginationExpertsListProps {
  experts: IExpert[];
  setPage: () => void;
}

export const AutoPaginationExpertsList: React.FC<IAutoPaginationExpertsListProps> = ({
  experts,
  setPage,
}) => {
  const lastElement = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25,
  };

  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
    if (lastElement.current) {
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage();
        }
      }, observerOptions);
      observer.current.observe(lastElement.current);
    }
  }, [experts.length]);

  return (
    <Grid container>
      {experts.length > 2 && (
        <ExpertsList
          experts={experts.slice(
            0,
            experts.length % 2 === 0 ? experts.length - 2 : experts.length - 1,
          )}
        />
      )}
      <Grid container ref={lastElement}>
        <ExpertsList
          experts={experts.slice(experts.length % 2 === 0 ? -2 : -1)}
        />
      </Grid>
    </Grid>
  );
};
