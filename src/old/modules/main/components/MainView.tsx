import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { PageTitle } from 'components/Page/PageTitle';
import { ImportantContainer } from './ImportantContainer';
import { NewestContainer } from '../../../../features/newest/NewestContainer';
import { setGALocation } from '../../../../utilities/setGALocation';
import { langTokens } from '../../../../locales/localizationInit';
import { ScreenContext } from '../../../provider/MobileProvider/ScreenContext';
import { NewestMobile } from '../../../../components/NewestMobile/NewestMobile';

const MainView: React.FC = () => {
  useEffect(() => {
    setGALocation(window);
  }, []);
  const { t } = useTranslation();
  const { mobile } = useContext(ScreenContext);

  return (
    <>
      <PageTitle title={t(langTokens.common.main)} />
      <ImportantContainer />
      {mobile ? <NewestMobile/> : <NewestContainer />}
    </>
  );
};

export default MainView;
