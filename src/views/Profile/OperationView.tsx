import React from 'react';
import { Container } from '@material-ui/core';
import MaterialsView from './MaterialsView';
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
        operationView = <div>Info</div>;
        break;
      }
      case 'materials': {
        operationView = <MaterialsView />;
        break;
      }
      case 'passwordChange': {
        operationView = <div>Password Change</div>;
        break;
      }
      case 'mail': {
        operationView = <div>Mail</div>;
        break;
      }

      default: {
        operationView = <div>Info</div>;
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
