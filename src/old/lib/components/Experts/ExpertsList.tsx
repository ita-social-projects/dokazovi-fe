import { Grid } from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LOAD_EXPERTS_LIMIT } from '../../constants/experts';
import { IExpert } from '../../types';
import ExpertPhotoDataCard from './ExpertPhotoDataCard';
import { Notification } from '../../../../components/Notifications/Notification';
import { langTokens } from '../../../../locales/localizationInit';

export interface IExpertsListProps {
  experts: IExpert[];
}

export const ExpertsList: React.FC<IExpertsListProps> = ({ experts }) => {
  const expertIdxForScroll = experts.length - LOAD_EXPERTS_LIMIT;
  const expertForScrollRef = useRef<HTMLDivElement>(null);

  const [prevExpertsCount, setPrevExpertsLength] = useState(experts.length);

  const { t } = useTranslation();

  useEffect(() => {
    if (!expertForScrollRef.current) return;
    if (
      experts.length > LOAD_EXPERTS_LIMIT &&
      experts.length !== prevExpertsCount
    ) {
      expertForScrollRef.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
    setPrevExpertsLength(experts.length);
  }, [experts.length]);

  return experts.length === 0 ? (
    <Notification message={t(langTokens.common.noInfo)} />
  ) : (
    <Grid container spacing={3}>
      {experts.map((expert, idx) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={expert.id}
          ref={expertIdxForScroll === idx ? expertForScrollRef : null}
        >
          <ExpertPhotoDataCard expert={expert} key={expert.id} />
        </Grid>
      ))}
    </Grid>
  );
};
