import React from 'react';
import { Container } from '@material-ui/core';
import { MaterialsView } from './MaterialsView/MaterialsView';
import { useStyles } from './styles/OperationView.styles';
import { IProfileMenuOption, IExpert } from '../../old/lib/types';
import { PasswordChangeView } from './PasswordChangeView';
import { PersonalInfo } from './PersonalInfo/PersonalInfo';

interface IOperationViewProps {
  selectedOption: IProfileMenuOption | Record<string, never>;
  expert: IExpert;
}

export const OperationView: React.FC<IOperationViewProps> = (props) => {
  const { selectedOption, expert } = props;
  const { value } = selectedOption;
  const classes = useStyles();

  const operationViews = {
    info: <PersonalInfo expert={expert}/>,
    materials: <MaterialsView expert={expert} />,
    passwordChange: <PasswordChangeView />,
    mail: <div>Mail</div>,
  };

  return (
    <Container className={classes.operationView}>
      {operationViews[value] ?? <div>Info</div>}
    </Container>
  );
};
