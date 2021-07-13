/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { Container, Typography } from '@material-ui/core';
import InfoView from './InfoView';
import MaterialsView from './MaterialsView';
import SecurityView from './SecurityView';
import { useStyles } from './styles/OperationView.styles';
import { IProfileMenuOption } from '../../old/lib/types';

interface IOperationViewProps {
  selectedOption: IProfileMenuOption | Record<string, never>;
}

const OperationView: React.FC<IOperationViewProps> = (props) => {
  const { selectedOption } = props;
  const { value } = selectedOption;
  const classes = useStyles();

  const renderOperationView = () => {
    let operationView: JSX.Element;

    switch (value) {
      case 'info': {
        operationView = <InfoView />;
        break;
      }
      case 'materials': {
        operationView = <MaterialsView />;
        break;
      }
      case 'security': {
        operationView = <SecurityView />;
        break;
      }

      default: {
        operationView = (
          <div className="profileInitialView">
            <Typography component="span" className="initialMessage">
              Оберіть об&apos;єкт налаштування у меню
            </Typography>
          </div>
        );
      }
    }

    return operationView;
  };

  return (
    <Container className={classes.operationView}>
      {renderOperationView()}
    </Container>
  );
};

export default OperationView;
