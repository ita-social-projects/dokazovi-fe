import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ImportantView from './ImportantView';
import { useStyles } from '../styles/OperationView.styles';
import { IAdminMenuOption } from '../../../../types';
import { langTokens } from '../../../../../../locales/localizationInit';
import { AdminTable } from '../../../../../../views/Profile/AdminTable/AdminTable';

interface IOperationViewProps {
  selectedOption: IAdminMenuOption | Record<string, never>;
}

const OperationView: React.FC<IOperationViewProps> = (props) => {
  const { selectedOption } = props;
  const { value } = selectedOption;
  const classes = useStyles();
  const { t } = useTranslation();

  const renderOperationView = () => {
    switch (value) {
      case 'important': {
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
      case 'materials': {
        const operationView = (
          <>
            <AdminTable />
          </>
        );

        return operationView;
      }
      default: {
        return <div>{t(langTokens.admin.selectOption)}</div>;
      }
    }
  };

  return (
    <Container className={classes.operationView}>
      {renderOperationView()}
    </Container>
  );
};

export default OperationView;
