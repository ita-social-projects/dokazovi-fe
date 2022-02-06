import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ImportantView from './ImportantView';
import { useStyles } from '../styles/OperationView.styles';
import { IAdminMenuOption } from '../../../../types';
import { langTokens } from '../../../../../../locales/localizationInit';

interface IOperationViewProps {
  selectedOption: IAdminMenuOption | Record<string, never>;
}

const OperationView: React.FC<IOperationViewProps> = (props) => {
  const { selectedOption } = props;
  const { section, label, value } = selectedOption;
  const classes = useStyles();
  const { t } = useTranslation();

  const renderOperationView = () => {
    if (value === 'important') {
      const operationView = (
        <>
          <Typography component="h2" className="menuTitle">
            {t(langTokens.admin.selectedImportantMaterials)}
          </Typography>
          <ImportantView />
        </>
      );

      return operationView;
    }

    const operationView = (
      <div className="adminInitialView">
        <Typography component="span" className="initialMessage">
          {t(langTokens.admin.selectOption)}
        </Typography>
      </div>
    );

    return operationView;
  };

  return (
    <Container className={classes.operationView}>
      {value && (
        <Typography component="h1" className="menuPath">
          {`${section} > ${label}`}
        </Typography>
      )}
      {renderOperationView()}
    </Container>
  );
};

export default OperationView;
