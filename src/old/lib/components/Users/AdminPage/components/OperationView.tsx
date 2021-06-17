import React from 'react';
import { Container, Typography } from '@material-ui/core';
import ImportantView from './ImportantView';
import { useStyles } from '../styles/OperationView.styles';
import { IAdminMenuOption } from '../../../../types';

interface IOperationViewProps {
  selectedOption: IAdminMenuOption | Record<string, never>;
}

const OperationView: React.FC<IOperationViewProps> = (props) => {
  const { selectedOption } = props;
  const { section, label, value } = selectedOption;
  const classes = useStyles();

  const renderOperationView = () => {
    let operationView = (
      <div className="adminInitialView">
        <Typography component="span" className="initialMessage">
          Оберіть об&apos;єкт налаштування у меню
        </Typography>
      </div>
    );

    if (value === 'important') {
      operationView = (
        <>
          <Typography component="h2" className="menuTitle">
            Зараз використовуються:
          </Typography>
          <ImportantView />
        </>
      );
    }

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
