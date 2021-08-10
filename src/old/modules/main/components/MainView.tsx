import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from 'components/Page/PageTitle';
import { ImportantContainer } from './ImportantContainer';
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
