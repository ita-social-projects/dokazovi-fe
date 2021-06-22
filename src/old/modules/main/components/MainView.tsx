import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImportantContainer } from './ImportantContainer';
import { PageTitle } from '../../../lib/components/Pages/PageTitle';
import { NewestContainer } from '../../../../features/newest/NewestContainer';
import { setGALocation } from '../../../../utilities/setGALocation';
import { langTokens } from '../../../../locales/localizationInit';

const MainView: React.FC = () => {
  useEffect(() => {
    setGALocation(window);
  }, []);
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t(langTokens.common.main)} />
      <ImportantContainer />
      <NewestContainer />
    </>
  );
};

export default MainView;
